import { InputType, PartialType } from '@nestjs/graphql';
import CreateBookInput from './createBook.input';

@InputType()
export default class UpdateBookInput extends PartialType(CreateBookInput) {}
