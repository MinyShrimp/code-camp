import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsDate } from 'class-validator';
import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

import { AuthorEntity } from 'src/apis/author/entities/author.entity';
import { PublisherEntity } from 'src/apis/publisher/entities/publisher.entity';
import { BookImageEntity } from 'src/apis/bookImage/entities/bookImage.entity';

@Entity({ name: 'book' })
@ObjectType({ description: '책 Entity' })
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 제목
    @Column()
    @Field(
        () => String, //
        { description: '제목' },
    )
    title: string;

    // 소제목
    @Column()
    @Field(
        () => String, //
        { description: '소제목' },
    )
    subtitle: string;

    // 설명
    @Column({ type: 'text' })
    @Field(
        () => String, //
        { description: '설명' },
    )
    description: string;

    // 쪽수
    @Column({ unsigned: true })
    @Field(
        () => Int, //
        { description: '페이지 수' },
    )
    page: number;

    // 10자리 ISBN
    @Column()
    @Field(
        () => String, //
        { description: '10자리 ISBN' },
    )
    isbn_10: string;

    // 13자리 ISBN
    @Column()
    @Field(
        () => String, //
        { description: '13자리 ISBN' },
    )
    isbn_13: string;

    // 출간일
    @Column()
    @IsDate()
    @Field(
        () => Date, //
        { description: '출간일' },
    )
    publish_at: Date;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 수정 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @DeleteDateColumn()
    deleteAt: Date;

    // 출판사
    @JoinColumn()
    @ManyToOne(() => PublisherEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => PublisherEntity, { nullable: true })
    publisher: PublisherEntity;

    // 저자
    @JoinColumn()
    @ManyToOne(() => AuthorEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => AuthorEntity, { nullable: true })
    author: AuthorEntity;

    // 책 이미지
    @OneToMany(
        () => BookImageEntity, //
        (book_img) => book_img.book,
        {
            cascade: true,
            onDelete: 'CASCADE',
        },
    )
    @Field(() => [BookImageEntity])
    book_images: BookImageEntity[];
}