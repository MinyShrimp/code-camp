import { InputType, PickType } from '@nestjs/graphql';
import { BaseEntity } from '../entities/base.entity';

@InputType()
export class CreateBaseInput extends PickType(
    BaseEntity, //
    [],
    InputType,
) {}
