import { Field, InputType, PickType } from '@nestjs/graphql';
import { BookImageEntity } from '../entities/bookImage.entity';

@InputType()
export class CreateBookImageInput extends PickType(
    BookImageEntity,
    ['isMain'],
    InputType,
) {
    @Field(() => String)
    uploadImageID: string;
}
