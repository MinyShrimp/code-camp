import { InputType, OmitType, PartialType, PickType } from "@nestjs/graphql";
import CreateProductInput from "./createProduct.input";

/**
 * PartialType( Class )
 * Class 내부의 Attribute들을 모두 ?로 변화시켜주는 함수
 */
@InputType()
export default class UpdateProductInput extends PartialType(CreateProductInput) {}

/**
 * PickType( Class, [ Attributes ], Decorator )
 * Class 내부의 Attribute들 중 선택해서 가져오기
 */
@InputType()
class A extends PickType(CreateProductInput, ["name", "price"]) {}

/**
 * OmitType( Class, [ Attributes ], Decorator )
 * Class 내부의 Attribute들 중 제거해서 가져오기
 */
@InputType()
class B extends OmitType(CreateProductInput, ["name", "price"]) {}
