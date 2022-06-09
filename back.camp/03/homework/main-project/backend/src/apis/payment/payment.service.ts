import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';

import { PaymentEntity } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/createPayment.input';
import { UserEntity } from '../user/entities/user.entity';
import { ProductEntity } from '../product/entities/product.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 결제 정보 생성
     * @param createPaymentInput
     * @returns 생성된 결제 정보
     */
    async create(
        user: UserEntity,
        product: ProductEntity,
        createPaymentInput: CreatePaymentInput,
    ): Promise<PaymentEntity> {
        return await this.paymentRepository.save({
            user: user,
            product: product,
            impUid: createPaymentInput.impUid,
            amount: createPaymentInput.amount,
            status: createPaymentInput.status,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 결제 정보 삭제 취소
     * @param paymentID
     * @returns ResultMessage
     */
    async restore(
        paymentID: string, //
    ): Promise<ResultMessage> {
        const result = await this.paymentRepository.restore({ id: paymentID });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: paymentID,
            isSuccess,
            contents: isSuccess
                ? MESSAGES.PAYMENT_RESTORE_SUCCESSED
                : MESSAGES.PAYMENT_RESTORE_FAILED,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 결제 정보 삭제 ( Soft )
     * @param paymentID
     * @returns ResultMessage
     */
    async softDelete(
        paymentID: string, //
    ) {
        const result = await this.paymentRepository.softDelete({
            id: paymentID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: paymentID,
            isSuccess,
            contents: isSuccess
                ? MESSAGES.PAYMENT_SOFT_DELETE_SUCCESSED
                : MESSAGES.PAYMENT_SOFT_DELETE_FAILED,
        });
    }
}
