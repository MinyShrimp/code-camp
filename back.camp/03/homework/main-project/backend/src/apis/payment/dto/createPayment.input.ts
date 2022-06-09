import { Field, InputType, PickType } from '@nestjs/graphql';
import { PaymentEntity } from '../entities/payment.entity';

@InputType()
export class CreatePaymentInput extends PickType(
    PaymentEntity,
    ['impUid', 'amount', 'status'],
    InputType,
) {
    @Field(
        () => String, //
        { description: '상품 ID' },
    )
    productID: string;
}
