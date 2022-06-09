import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from '../../commons/auth/gql-auth.guard';
import { CurrentUser } from '../../commons/auth/gql-user.param';
import { IPayload } from '../../commons/interfaces/Payload.interface';

import { UserService } from '../user/user.service';
import { UserCheckService } from '../user/userCheck.service';
import { ProductService } from '../product/product.service';

import { PaymentEntity } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/createPayment.input';
import { PaymentService } from './payment.service';

/* 결제 API */
@Resolver()
export class PaymentResolver {
    constructor(
        private readonly userService: UserService,
        private readonly userCheckService: UserCheckService,
        private readonly productService: ProductService,
        private readonly paymentService: PaymentService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/payment
     * @param createPaymentInput
     * @returns 생성된 결제 정보
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
        console.log(currentUser);

        // 상품 존재 체크
        const product = await this.productService.findOne(
            createPaymentInput.productID,
        );

        // 회원 존재 체크
        const user = await this.userService.findOneByID(currentUser.id);
        await this.userCheckService.checkValidUser(user);

        // 결제 DB에 추가
        const payment = await this.paymentService.create(
            user,
            product,
            createPaymentInput,
        );

        // 회원 포인트 수정
        await this.userService.updateAmount(
            currentUser.id,
            createPaymentInput.amount,
        );

        return payment;
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PUT /api/payment/:id
     * @param paymentID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '결제 정보 삭제 취소' },
    )
    restorePayment(
        @Args('paymentID') paymentID: string, //
    ): Promise<ResultMessage> {
        return this.paymentService.restore(paymentID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /api/payment/:id
     * @param paymentID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '결제 정보 삭제 ( Soft )' },
    )
    softDeletePayment(
        @Args('paymentID') paymentID: string, //
    ): Promise<ResultMessage> {
        return this.paymentService.softDelete(paymentID);
    }
}
