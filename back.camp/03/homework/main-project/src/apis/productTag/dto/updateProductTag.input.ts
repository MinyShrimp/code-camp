import { InputType, PartialType } from '@nestjs/graphql';
import CreateProductTagInput from './createProductTag.input';

/**
 * PartialType( Class )
 * Class 내부의 Attribute들을 모두 ?로 변화시켜주는 함수
 */
@InputType()
export default class UpdateProductTagInput extends PartialType(
    CreateProductTagInput,
) {}
