/**
 * 유저 Entity
 */

import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
export default class UserEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
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
    pwd: string;

    // 생성 시간
    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    // 업데이트 시간
    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @Field(() => Date)
    @DeleteDateColumn()
    deleteAt: Date;
}
