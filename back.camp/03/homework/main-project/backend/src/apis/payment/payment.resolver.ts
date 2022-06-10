import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GqlJwtAccessGuard } from '../../commons/auth/gql-auth.guard';
import { CurrentUser } from '../../commons/auth/gql-user.param';
import { IPayload } from '../../commons/interfaces/Payload.interface';

import { UserService } from '../user/user.service';
import { UserCheckService } from '../user/userCheck.service';
import { ProductService } from '../product/product.service';

import { PaymentEntity } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/createPayment.input';
import { PaymentService } from './payment.service';
import { CancelPaymentInput } from './dto/cancelPayment.input';

/* 결제 API */
@Resolver()
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService, //
        private readonly userService: UserService,
        private readonly userCheckService: UserCheckService,
        private readonly productService: ProductService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 새로운 결제 정보 //

    /**
     * POST /api/payment
     * @param createPaymentInput
     * @response 생성된 결제 정보
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => PaymentEntity, //
        { description: '결제 정보 생성' },
    )
    async createPayment(
        @Args('createPaymentInput')
        createPaymentInput: CreatePaymentInput,
        @CurrentUser() currentUser: IPayload,
    ): Promise<PaymentEntity> {
        // 결제 정보 검증
        const impPaymentData = await this.paymentService.checkData(
            createPaymentInput,
        );
        await this.paymentService.checkOverlapUID(createPaymentInput.impUid);

        // 상품 존재 검증
        const product = await this.productService.findOne(
            createPaymentInput.productID,
        );

        // 회원 존재 검증
        const user = await this.userService.findOneByID(currentUser.id);
        await this.userCheckService.checkValidUser(user);

        // 결제 DB에 추가
        const payment = await this.paymentService.create(
            user,
            product,
            createPaymentInput,
        );

        // 회원 포인트 수정
        await this.userService.updateAmount(user.id, impPaymentData.amount);

        return payment;
    }

    ///////////////////////////////////////////////////////////////////
    // 결제 취소 //

    /**
     * POST /api/payment/cancel
     * @param cancelPaymentInput
     * @param currentUser
     * @response 취소된 결제 정보
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(() => PaymentEntity, { description: '결제 전부 취소' })
    async cancelPayment(
        @Args('cancelPaymentInput')
        cancelPaymentInput: CancelPaymentInput,
        @CurrentUser() currentUser: IPayload,
    ): Promise<PaymentEntity> {
        // DB에 저장된 결제 정보 가져오기
        const payments = await this.paymentService.findMany(cancelPaymentInput);
        const payment = payments[0];

        // 결제 정보가 존재하는지 검사
        await this.paymentService.checkValidPayment(payments);

        // 회원 검사
        this.userCheckService.checkPayload(payment.user, currentUser);

        // 남은 결제 금액 찾기
        const checksum = await this.paymentService.findSum(cancelPaymentInput);

        // 이미 취소되었는지 검사
        await this.paymentService.checkAlreadyCancel(checksum);

        // IamPort에 응답 받기
        const impCancelData = await this.paymentService.sendCancelData(
            payment,
            checksum,
        );

        // 결제 DB에 추가
        const result = await this.paymentService.create(
            payment.user,
            payment.product,
            impCancelData,
        );

        // 회원 포인트 수정
        await this.userService.updateAmount(
            payment.userId,
            impCancelData.amount,
        );

        return result;
    }
}
