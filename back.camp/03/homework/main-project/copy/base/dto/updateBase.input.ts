import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBaseInput } from './createBase.input';

@InputType()
export class UpdateBaseInput extends PartialType(CreateBaseInput) {}
