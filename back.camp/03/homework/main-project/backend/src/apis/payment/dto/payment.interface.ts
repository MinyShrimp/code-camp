import { PaymentEntity } from '../entities/payment.entity';

export interface IPayment
    extends Pick<
        PaymentEntity,
        'impUid' | 'merchantUid' | 'amount' | 'status'
    > {}
