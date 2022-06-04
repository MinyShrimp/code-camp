/**
 * 유저 Entity
 */

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
@ObjectType({ description: '유저 Entity' })
export default class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 이름
    @Column()
    @Field(() => String, { description: '이름' })
    name: string;

    // 이메일
    @Column()
    @IsEmail()
    @Field(() => String, { description: '이메일' })
    email: string;

    // 비밀번호
    @Column()
    pwd: string;

    // 로그인 시간
    @Column({ nullable: true })
    loginAt: Date;

    // 로그아웃 시간
    @Column({ nullable: true })
    logoutAt: Date;

    // 로그인 여부
    @Column({ default: false })
    isLogin: boolean;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 업데이트 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @DeleteDateColumn()
    deleteAt: Date;
}
