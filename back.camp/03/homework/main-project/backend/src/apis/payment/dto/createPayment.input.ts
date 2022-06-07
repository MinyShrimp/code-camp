import { Field, InputType, PickType } from '@nestjs/graphql';
import { PaymentEntity } from '../entities/payment.entity';

@InputType()
export class CreatePaymentInput extends PickType(
    PaymentEntity,
    ['money', 'state', 'type', 'paymentAt'],
    InputType,
) {
    @Field(
        () => String, //
        { description: '회원 ID' },
    )
    userID: string;

    @Field(
        () => String, //
        { description: '상품 ID' },
    )
    productID: string;
}