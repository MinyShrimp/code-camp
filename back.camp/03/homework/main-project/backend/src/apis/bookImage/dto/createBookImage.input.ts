import { Field, InputType, PickType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { BookImageEntity } from '../entities/bookImage.entity';

@InputType()
export class CreateBookImageInput extends PickType(
    BookImageEntity,
    ['isMain'],
    InputType,
) {
    @Field(() => GraphQLUpload)
    file: FileUpload;
}
