import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

import { PaymentEntity } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/createPayment.input';
import { UpdatePaymentInput } from './dto/updatePayment.input';

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

    /**
     * 결제 정보 전체 조회
     * @returns 조회된 결제 정보 목록
     */
    async findAll(): Promise<PaymentEntity[]> {
        return await this.paymentRepository.find({});
    }

    /**
     * 결제 정보 단일 조회
     * @param paymentID
     * @returns 조회된 결제 정보
     */
    async findOne(
        paymentID: string, //
    ): Promise<PaymentEntity> {
        return await this.paymentRepository.findOne({
            id: paymentID,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 결제 정보 생성
     * @param createPaymentInput
     * @returns 생성된 결제 정보
     */
    async create(
        createPaymentInput: CreatePaymentInput,
    ): Promise<PaymentEntity> {
        const { ...input } = createPaymentInput;

        return await this.paymentRepository.save({
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 결제 정보 수정
     * @param paymentID
     * @param updatePaymentInput
     * @returns 수정된 결제 정보
     */
    async update(
        paymentID: string, //
        updatePaymentInput: UpdatePaymentInput,
    ): Promise<PaymentEntity> {
        const { ...input } = updatePaymentInput;

        const payment = await this.findOne(paymentID);

        return await this.paymentRepository.save({
            ...payment,
            ...input,
        });
    }

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
                ? 'Completed Payment Restore'
                : 'Failed Payment Restore',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 결제 정보 삭제 ( Real )
     * @param paymentID
     * @returns ResultMessage
     */
    async delete(
        paymentID: string, //
    ): Promise<ResultMessage> {
        const result = await this.paymentRepository.delete({
            id: paymentID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: paymentID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Payment Delete'
                : 'Failed Payment Delete',
        });
    }

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
                ? 'Completed Payment Soft Delete'
                : 'Failed Payment Soft Delete',
        });
    }
}
