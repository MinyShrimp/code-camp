import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentAdminRepository {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
    ) {}

    private readonly _selector = [
        'payment.id',
        'payment.impUid',
        'payment.merchantUid',
        'payment.amount',
        'payment.status',
        'payment.createAt',
        'user.id',
        'user.email',
        'product.id',
        'product.name',
    ];

    async findAll(): Promise<PaymentEntity[]> {
        return await this.paymentRepository
            .createQueryBuilder('payment')
            .select(this._selector)
            .withDeleted()
            .leftJoin('payment.user', 'user')
            .leftJoin('payment.product', 'product')
            .orderBy('payment.createAt')
            .getMany();
    }

    async findOne(
        paymentID: string, //
    ): Promise<PaymentEntity> {
        return await this.paymentRepository
            .createQueryBuilder('payment')
            .select(this._selector)
            .withDeleted()
            .leftJoin('payment.user', 'user')
            .leftJoin('payment.product', 'product')
            .where('payment.id=:id', { id: paymentID })
            .orderBy('payment.createAt')
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) => {
                return this.paymentRepository.delete({ id: id });
            }),
        );
    }
}
