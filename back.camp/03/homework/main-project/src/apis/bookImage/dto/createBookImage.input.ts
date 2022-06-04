import { InputType, PickType } from '@nestjs/graphql';
import BookImageEntity from '../entities/bookImage.entity';

@InputType()
export default class CreateBookImageInput extends PickType(
    BookImageEntity,
    ['url', 'isMain'],
    InputType,
) {}
