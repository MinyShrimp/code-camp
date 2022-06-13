import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IPayload } from '../../commons/interfaces/Payload.interface';

import { UserEntity } from '../user/entities/user.entity';
import { UserCheckService } from '../user/userCheck.service';
import { ProductEntity } from '../product/entities/product.entity';
import { ProductCheckService } from '../product/productCheck.service';

import { IPayment } from './dto/payment.interface';
import { PaymentEntity } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/createPayment.input';
import { CancelPaymentInput } from './dto/cancelPayment.input';

import { IMPService } from './imp.service';
import { PaymentCheckService } from './paymentCheck.service';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,

        private readonly connection: Connection,
        private readonly impService: IMPService,
        private readonly userCheckService: UserCheckService,
        private readonly paymentCheckService: PaymentCheckService, //
        private readonly productCheckService: ProductCheckService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 금액 수정 //

    private async paymentTransaction(
        userId: string,
        productID: string,
        iPayment: IPayment, //
    ): Promise<PaymentEntity> {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        let payment: PaymentEntity = undefined;

        try {
            // 상품 존재 검증
            const product = await queryRunner.manager.findOne(
                ProductEntity,
                { id: productID },
                { lock: { mode: 'pessimistic_write' } },
            );
            this.productCheckService.checkValidProduct(product);

            // 회원 존재 검증
            const user = await queryRunner.manager.findOne(
                UserEntity,
                { id: userId },
                { lock: { mode: 'pessimistic_write' } },
            );
            this.userCheckService.checkValidUser(user);

            // 결제 DB에 추가
            payment = this.paymentRepository.create({
                user: user,
                product: product,
                impUid: iPayment.impUid,
                amount: iPayment.amount,
                status: iPayment.status,
                merchantUid: iPayment.merchantUid,
            });
            await queryRunner.manager.save(payment);

            // 회원 포인트 수정
            const updateUser = this.userRepository.create({
                ...user,
                point: user.point + iPayment.amount,
            });
            await queryRunner.manager.save(updateUser);

            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
            return payment;
        }
    }

    ///////////////////////////////////////////////////////////////////
    // 새로운 결제 정보 //

    /**
     * POST /api/payment
     * @param createPaymentInput
     * @response 생성된 결제 정보
     */
    async createPayment(
        createPaymentInput: CreatePaymentInput,
        currentUser: IPayload,
    ): Promise<PaymentEntity> {
        // 결제 정보 검증
        const impPaymentData = await this.impService.sendData(
            createPaymentInput,
        );
        this.impService.checkData(createPaymentInput, impPaymentData);
        await this.impService.checkOverlapUID(createPaymentInput.impUid);

        const { productID, ...input } = createPaymentInput;
        return await this.paymentTransaction(currentUser.id, productID, input);
    }

    ///////////////////////////////////////////////////////////////////
    // 결제 취소 //

    async cancelPayment(
        cancelPaymentInput: CancelPaymentInput,
        currentUser: IPayload,
    ): Promise<PaymentEntity> {
        // DB에 저장된 결제 정보 가져오기
        const payments = await this.findMany(cancelPaymentInput);
        const payment = payments[0];

        // 결제 정보가 존재하는지 검사
        this.paymentCheckService.checkValidPayment(payments);

        // 회원 검사
        this.userCheckService.checkPayload(payment.user, currentUser);

        // 남은 결제 금액 찾기
        const checksum = await this.findSum(cancelPaymentInput);

        // 이미 취소되었는지 검사
        this.paymentCheckService.checkAlreadyCancel(checksum);

        // IamPort에 응답 받기
        const impCancelData = await this.impService.sendCancelData(
            payment,
            checksum,
        );

        return await this.paymentTransaction(
            payment.user.id,
            payment.product.id,
            impCancelData,
        );
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
}
