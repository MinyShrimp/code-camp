import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GqlJwtAccessGuard } from '../../commons/auth/gql-auth.guard';
import { CurrentUser } from '../../commons/auth/gql-user.param';
import { IPayload } from '../../commons/interfaces/Payload.interface';

import { PaymentEntity } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/createPayment.input';
import { CancelPaymentInput } from './dto/cancelPayment.input';
import { PaymentService } from './payment.service';

/* 결제 API */
@Resolver()
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService, //
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
        return await this.paymentService.createPayment(
            createPaymentInput,
            currentUser,
        );
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
        return await this.paymentService.cancelPayment(
            cancelPaymentInput,
            currentUser,
        );
    }
}
