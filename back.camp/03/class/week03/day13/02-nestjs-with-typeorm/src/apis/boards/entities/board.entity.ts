import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    // DB Table 이름을 지정해줄 수 있다.
    name: "board",
})
@ObjectType()
export default class BoardEntity {
    @PrimaryGeneratedColumn("increment")
    @Field(() => Int)
    id: number;

    @Column()
    @Field(() => String)
    writer: string;

    @Column()
    @Field(() => String)
    title: string;

    @Column()
    @Field(() => String)
    contents: string;
}
