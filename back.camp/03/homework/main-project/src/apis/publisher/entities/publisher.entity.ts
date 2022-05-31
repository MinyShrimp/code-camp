/**
 * 출판사 Entity
 */

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'publisher' })
export default class PublisherEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 이름
    @Field(() => String)
    @Column()
    name: string;

    // 설명
    @Field(() => String)
    @Column()
    description: string;
}
