import { InputType, PickType } from '@nestjs/graphql';
import AuthorEntity from '../entities/author.entity';

@InputType()
export default class CreateAuthorInput extends PickType(
    AuthorEntity,
    ['name', 'description'],
    InputType,
) {}
