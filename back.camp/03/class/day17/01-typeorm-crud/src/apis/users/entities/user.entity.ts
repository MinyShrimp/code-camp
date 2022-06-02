/**
 * 유저 Entity
 */

import { Field, ID, ObjectType } from "@nestjs/graphql";
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

    // 비밀번호
    @Field(() => String)
    @Column()
    password: string;

    // salt
    @Field(() => String)
    @Column()
    salt: string;
}
