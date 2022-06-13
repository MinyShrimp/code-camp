import {
    ConflictException,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { MESSAGES } from '../../commons/message/Message.enum';

import { PaymentEntity } from './entities/payment.entity';
import { IPayment } from './dto/payment.interface';

@Injectable()
export class IMPService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 공통 //

    /**
     * 아임포트 AccessToken 가져오기
     * @returns AccessToken
     */
    private async getToken(): Promise<string> {
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
    private async getPaymentData(
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
     * @param impRequestData
     */
    checkData(
        iPayment: IPayment,
        impRequestData: IPayment, //
    ): void {
        // impUid 검증
        // MerchantUid 검증
        // 금액 검증
        // 상태 검증
        if (
            impRequestData.impUid !== iPayment.impUid ||
            impRequestData.merchantUid !== iPayment.merchantUid ||
            impRequestData.amount !== iPayment.amount ||
            impRequestData.status.toUpperCase() !== iPayment.status
        ) {
            throw new UnprocessableEntityException(
                MESSAGES.UNVLIAD_ACCESS, //
            );
        }
    }

    /**
     * 아임포트에 데이터 보내기
     * @param iPayment
     */
    async sendData(
        iPayment: IPayment, //
    ): Promise<IPayment> {
        try {
            const accessToken = await this.getToken();
            const paymentData = await this.getPaymentData(
                iPayment.impUid,
                accessToken,
            );

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
    private async getCancelData(
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
            const accessToken = await this.getToken();
            const cancelData = await this.getCancelData(
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
}
