import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({
    description: "Boards"
})
export default class Boards {
    @Field(type => ID)
    id: string;
}