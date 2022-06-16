/**
 * 유저 Entity
 */

import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "user" })
export default class UserEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // 이름
    @Field(() => String)
    @Column()
    name: string;

    // 이메일
    @Field(() => String)
    @Column()
    email: string;

    // 나이
    @Field(() => Int)
    @Column()
    age: number;

    // 보유 금액
    @Field(() => Int)
    @Column({ default: 0 })
    amount: number;

    // 비밀번호
    @Column()
    pwd: string;

    // salt
    // @Column()
    // salt: string;
}
