import { Field, InputType, PickType } from '@nestjs/graphql';
import { ReviewEntity } from '../entities/review.entity';

@InputType()
export class CreateReviewInput extends PickType(
    ReviewEntity,
    ['contents', 'star', 'like'],
    InputType,
) {
    @Field(() => String, { description: '회원 ID' })
    userID: string;

    @Field(() => String, { description: '상품 ID' })
    productID: string;
}
