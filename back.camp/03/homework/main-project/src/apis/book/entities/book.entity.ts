/**
 * 책 Entity
 */

import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import AuthorEntity from 'src/apis/author/entities/author.entity';
import PublisherEntity from 'src/apis/publisher/entities/publisher.entity';

@ObjectType()
@Entity({ name: 'book' })
export default class BookEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 제목
    @Field(() => String)
    @Column()
    title: string;

    // 소제목
    @Field(() => String)
    @Column()
    subtitle: string;

    // 설명
    @Field(() => String)
    @Column({ type: 'text' })
    description: string;

    // 쪽수
    @Field(() => Int)
    @Column({ unsigned: true })
    page: number;

    // 10자리 ISBN
    @Field(() => String)
    @Column()
    isbn_10: string;

    // 13자리 ISBN
    @Field(() => String)
    @Column()
    isbn_13: string;

    // 출간일
    @Field(() => Date)
    @Column()
    publish_at: Date;

    // 출판사
    @Field(() => PublisherEntity)
    @JoinColumn()
    @ManyToOne(() => PublisherEntity)
    publisher: PublisherEntity;

    // 저자
    @Field(() => AuthorEntity)
    @JoinColumn()
    @ManyToOne(() => AuthorEntity)
    author: AuthorEntity;
}
