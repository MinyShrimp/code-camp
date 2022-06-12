import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express';

import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { UserCheckService } from '../user/userCheck.service';

import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService, //
        private readonly userService: UserService,
        private readonly userCheckService: UserCheckService,
        private readonly productService: ProductService,
    ) {}

    @Post('/iamport-webhook')
    async Complete(
        @Req() req: Request, //
        @Res() res: Response,
    ) {
        try {
            const { imp_uid, merchant_uid, amount, status } = req.body;

            // 결제 정보 검증
            await this.paymentService.checkData({
                impUid: imp_uid,
                merchantUid: merchant_uid,
                amount: amount,
                status: status,
            });
            await this.paymentService.checkOverlapUID(imp_uid);

            // 결제 DB에 추가
            // const payment = await this.paymentService.create(
            //     user,
            //     product,
            //     createPaymentInput,
            // );

            /**
             * {
             *     "amount": 100,
             *     "apply_num": "",
             *     "bank_code": null,
             *     "bank_name": null,
             *     "buyer_addr": "서울특별시 구로구 디지털로 300",
             *     "buyer_email": "ksk7584@gmail.com",
             *     "buyer_name": "김회민",
             *     "buyer_postcode": "01181",
             *     "buyer_tel": "010-2011-5029",
             *     "cancel_amount": 100,
             *     "cancel_history": [
             *         {
             *             "pg_tid": "nictest00m01012206092208238238",
             *             "amount": 100,
             *             "cancelled_at": 1654783623,
             *             "reason": "관리자페이지취소",
             *             "receipt_url": "https://npg.nicepay.co.kr/issue/IssueLoader.do?TID=nictest00m01012206092208238238&type=0&InnerWin=Y"
             *         }
             *     ],
             *     "cancel_reason": "관리자페이지취소",
             *     "cancel_receipt_urls": [
             *         "https://npg.nicepay.co.kr/issue/IssueLoader.do?TID=nictest00m01012206092208238238&type=0&InnerWin=Y"
             *     ],
             *     "cancelled_at": 1654783623,
             *     "card_code": null,
             *     "card_name": null,
             *     "card_number": null,
             *     "card_quota": 0,
             *     "card_type": null,
             *     "cash_receipt_issued": false,
             *     "channel": "pc",
             *     "currency": "KRW",
             *     "custom_data": null,
             *     "customer_uid": null,
             *     "customer_uid_usage": null,
             *     "emb_pg_provider": null,
             *     "escrow": false,
             *     "fail_reason": null,
             *     "failed_at": 0,
             *     "imp_uid": "imp_245081751564",
             *     "merchant_uid": "nobody_1654780079485",
             *     "name": "노르웨이 회전 의자",
             *     "paid_at": 1654780104,
             *     "pay_method": "point",
             *     "pg_id": "nictest00m",
             *     "pg_provider": "nice",
             *     "pg_tid": "nictest00m01012206092208238238",
             *     "receipt_url": "https://npg.nicepay.co.kr/issue/IssueLoader.do?TID=nictest00m01012206092208238238&type=0&InnerWin=Y",
             *     "started_at": 1654780081,
             *     "status": "cancelled",
             *     "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36",
             *     "vbank_code": null,
             *     "vbank_date": 0,
             *     "vbank_holder": null,
             *     "vbank_issued_at": 0,
             *     "vbank_name": null,
             *     "vbank_num": null
             * }
             */
            // const paymentData = getPaymentData.data.response;

            // res.send(paymentData.imp_uid);
            res.send('Success');
        } catch (e) {
            res.status(400).send('Failed');
        }
    }
}
