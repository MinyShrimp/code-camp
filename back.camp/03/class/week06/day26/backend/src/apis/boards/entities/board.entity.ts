import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "board" })
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
