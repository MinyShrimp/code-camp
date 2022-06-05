import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

import { PaymentEntity } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/createPayment.input';
import { UpdatePaymentInput } from './dto/updatePayment.input';
import { PaymentService } from './payment.service';

/* 결제 API */
@Resolver()
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/payments
     * @returns 조회된 결제 정보 목록
     */
    @Query(
        () => [PaymentEntity], //
        { description: '결제 정보 전체 조회' },
    )
    fetchPayments(): Promise<PaymentEntity[]> {
        return this.paymentService.findAll();
    }

    /**
     * GET /api/payment/:id
     * @param paymentID
     * @returns 조회된 결제 정보
     */
    @Query(
        () => PaymentEntity, //
        { description: '결제 정보 조회' },
    )
    fetchPayment(
        @Args('paymentID') paymentID: string, //
    ): Promise<PaymentEntity> {
        return this.paymentService.findOne(paymentID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/payment
     * @param createPaymentInput
     * @returns 생성된 결제 정보
     */
    @Mutation(
        () => PaymentEntity, //
        { description: '결제 정보 생성' },
    )
    createPayment(
        @Args('createPaymentInput')
        createPaymentInput: CreatePaymentInput,
    ): Promise<PaymentEntity> {
        return this.paymentService.create(createPaymentInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/payment/:id
     * @param paymentID
     * @param updatePaymentInput
     * @returns 수정된 결제 정보
     */
    @Mutation(
        () => PaymentEntity, //
        { description: '결제 정보 수정' },
    )
    updatePayment(
        @Args('paymentID') paymentID: string,
        @Args('updatePaymentInput')
        updatePaymentInput: UpdatePaymentInput,
    ): Promise<PaymentEntity> {
        return this.paymentService.update(paymentID, updatePaymentInput);
    }

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
     * DELETE /admin/payment/:id
     * @param paymentID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '결제 정보 삭제 ( Real )' },
    )
    deletePayment(
        @Args('paymentID') paymentID: string, //
    ): Promise<ResultMessage> {
        return this.paymentService.delete(paymentID);
    }

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
