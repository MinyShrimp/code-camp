import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateStarbucksInput {
    /* 음료명 */
    @Field(() => String)
    name: String;

    /* 가격 */
    @Field(() => Number)
    price: Number;

    /* 1회 제공량 (kcal) */
    @Field(() => Number)
    kcal: Number;

    /* 포화지방 (g) */
    @Field(() => Number)
    saturatedFat: Number;

    /* 단백질 (g) */
    @Field(() => Number)
    protein: Number;

    /* 나트륨 (mg) */
    @Field(() => Number)
    salt: Number;

    /* 당류 (g) */
    @Field(() => Number)
    sugar: Number;

    /* 카페인 (mg) */
    @Field(() => Number)
    caffeine: Number;
}
