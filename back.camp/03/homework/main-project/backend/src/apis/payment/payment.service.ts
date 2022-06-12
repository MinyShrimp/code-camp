import {
    ConflictException,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { MESSAGES } from '../../commons/message/Message.enum';

import { UserEntity } from '../user/entities/user.entity';
import { ProductEntity } from '../product/entities/product.entity';

import { PaymentEntity } from './entities/payment.entity';
import { IPayment } from './dto/payment.interface';
import { CancelPaymentInput } from './dto/cancelPayment.input';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 공통 //

    /**
     * 아임포트 AccessToken 가져오기
     * @returns AccessToken
     */
    private async __getToken(): Promise<string> {
        const getToken = await axios.post(
            'https://api.iamport.kr/users/getToken',
            {
                imp_key: process.env.IMP_API_KEY,
                imp_secret: process.env.IMP_API_SECRET,
            },
        );
        return getToken.data.response.access_token;
    }

    ///////////////////////////////////////////////////////////////////
    // 새로운 결제 정보 생성 //

    /**
     * 아임포트 결제 정보 가져오기
     * @param impUid
     * @param accessToken
     * @returns 결제 정보
     */
    private async __getPaymentData(
        impUid: string, //
        accessToken: string,
    ): Promise<IPayment> {
        const getPaymentData = await axios.get(
            `https://api.iamport.kr/payments/${impUid}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        const res = getPaymentData.data.response;
        return {
            impUid: res.imp_uid,
            merchantUid: res.merchant_uid,
            amount: res.amount,
            status: res.status,
        };
    }

    /**
     * DB에 중복된 Uid가 있는지 검사
     * @param impUid
     */
    async checkOverlapUID(
        impUid: string, //
    ): Promise<void> {
        const count = await this.paymentRepository.count({
            where: { impUid: impUid },
        });
        if (count !== 0) {
            throw new ConflictException(MESSAGES.PAYMENT_OVERLAP_UID);
        }
    }

    /**
     * Reqeust Data 검증
     * @param iPayment
     */
    async checkData(
        iPayment: IPayment, //
    ): Promise<IPayment> {
        try {
            const accessToken = await this.__getToken();
            const paymentData = await this.__getPaymentData(
                iPayment.impUid,
                accessToken,
            );

            // impUid 검증
            // MerchantUid 검증
            // 금액 검증
            // 상태 검증
            if (
                paymentData.impUid !== iPayment.impUid ||
                paymentData.merchantUid !== iPayment.merchantUid ||
                paymentData.amount !== iPayment.amount ||
                paymentData.status.toUpperCase() !== iPayment.status
            ) {
                throw '';
            }

            return paymentData;
        } catch (e) {
            throw new UnprocessableEntityException(
                MESSAGES.UNVLIAD_ACCESS, //
            );
        }
    }

    ///////////////////////////////////////////////////////////////////
    // 결제 취소 //

    /**
     * 결제 취소 아임포트에 보내기
     * @param payment
     * @param checksum
     * @param accessToken
     * @returns 아임포트에서 받은 데이터
     */
    private async __getCancelData(
        payment: PaymentEntity, //
        checksum: number,
        accessToken: string,
    ): Promise<IPayment> {
        const getCancelData = await axios.post(
            'https://api.iamport.kr/payments/cancel', //
            {
                imp_uid: payment.impUid,
                merchant_uid: payment.merchantUid,
                reason: '테스트',
                amount: payment.amount,
                checksum: checksum,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        const res = getCancelData.data.response;
        return {
            impUid: res.imp_uid,
            merchantUid: res.merchant_uid,
            amount: res.cancel_amount * -1,
            status: res.status.toUpperCase(),
        };
    }

    /**
     * 결제 정보가 존재하는지 검사
     * @param payments
     */
    checkValidPayment(
        payments: PaymentEntity[], //
    ): void {
        if (payments.length === 0) {
            throw new ConflictException(
                MESSAGES.PAYMENT_UNVALID, //
            );
        }
    }

    /**
     * 이미 취소되었는지 검사
     * @param sum
     */
    checkAlreadyCancel(
        sum: number, //
    ): void {
        if (sum === 0) {
            throw new UnprocessableEntityException(
                MESSAGES.PAYMENT_ALREADY_CANCEL, //
            );
        }
    }

    /**
     * 아임포트에 결제 정보 보내기
     * @param payment
     * @param checksum
     * @returns 아임포트에서 받은 결과 정보
     */
    async sendCancelData(
        payment: PaymentEntity, //
        checksum: number,
    ): Promise<IPayment> {
        try {
            const accessToken = await this.__getToken();
            const cancelData = await this.__getCancelData(
                payment,
                checksum,
                accessToken,
            );

            return cancelData;
        } catch (e) {
            throw new UnprocessableEntityException(
                MESSAGES.UNVLIAD_ACCESS, //
            );
        }
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * impUid와 merchantUid에 해당하는 모든 결제 정보 가져오기
     * @param cancelPaymentInput
     * @returns 결제 정보 들
     */
    async findMany(
        cancelPaymentInput: CancelPaymentInput, //
    ): Promise<PaymentEntity[]> {
        return await this.paymentRepository.find({
            where: {
                impUid: cancelPaymentInput.impUid,
                merchantUid: cancelPaymentInput.merchantUid,
            },
            relations: ['user', 'product'],
        });
    }

    /**
     * 남은 결제 금액 가져오기
     * @param cancelPaymentInput
     * @returns Sum of Amount
     */
    async findSum(
        cancelPaymentInput: CancelPaymentInput, //
    ): Promise<number> {
        return parseInt(
            (
                await this.paymentRepository.query(`
                    select sum(p.amount) as sumAmount
                    from payment p 
                    where p.impUid="${cancelPaymentInput.impUid}" 
                    and p.merchantUid="${cancelPaymentInput.merchantUid}"
                    ;
                `)
            )[0].sumAmount,
        );
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 결제 정보 생성
     * @param user
     * @param product
     * @param iPayment
     * @returns 생성된 결제 정보
     */
    async create(
        user: UserEntity,
        product: ProductEntity,
        iPayment: IPayment,
    ): Promise<PaymentEntity> {
        // 결제 정보 추가
        return await this.paymentRepository.save({
            user: user,
            product: product,
            impUid: iPayment.impUid,
            merchantUid: iPayment.merchantUid,
            amount: iPayment.amount,
            status: iPayment.status,
        });
    }
}
