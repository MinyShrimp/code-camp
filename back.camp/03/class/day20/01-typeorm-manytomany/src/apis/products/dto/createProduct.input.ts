import { Field, InputType, Int } from "@nestjs/graphql";
import { Min } from "class-validator";
import CreateProductSalesLocationInput from "src/apis/productsSaleslocation/dto/createProductSaleslocation.input";

@InputType()
export default class CreateProductInput {
    // 이름
    @Field(() => String)
    name: string;

    // 내용
    @Field(() => String)
    description: string;

    // 가격
    @Min(0)
    @Field(() => Int)
    price: number;

    // 주소
    @Field(() => CreateProductSalesLocationInput)
    productSaleslocation: CreateProductSalesLocationInput;

    // 카테고리
    @Field(() => String)
    productCategoryId: string;

    // Tag
    @Field(() => [String])
    productTags: string[];
}
