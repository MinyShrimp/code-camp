import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './createBook.input';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {}
