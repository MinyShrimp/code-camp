/**
 * 책 이미지 Entity
 */

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import BookEntity from 'src/apis/book/entities/book.entity';

@ObjectType()
@Entity({ name: 'book_img' })
export default class BookImageEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // img url
    @Field(() => String)
    @Column()
    url: string;

    // 메인 이미지 여부
    @Field(() => Boolean)
    @Column()
    isMain: boolean;

    // 책
    @Field(() => BookEntity)
    @ManyToOne(() => BookEntity)
    book: BookEntity;
}
