/**
 * 유저 Entity
 */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export default class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // 이름
    @Column()
    name: string;

    // 이메일
    @Column()
    email: string;

    // 비밀번호
    @Column()
    password: string;

    // salt
    @Column()
    salt: string;
}
