import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsUrl } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { BookEntity } from 'src/apis/book/entities/book.entity';

@Entity({ name: 'book_img' })
@ObjectType({ description: '책 이미지 Entity' })
export class BookImageEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // img url
    @Column()
    @IsUrl()
    @Field(
        () => String, //
        { description: '책 이미지 URL' },
    )
    url: string;

    // 메인 이미지 여부
    @Column()
    @IsBoolean()
    @Field(
        () => Boolean, //
        { description: '메인 이미지 여부' },
    )
    isMain: boolean;

    // 책
    @ManyToOne(() => BookEntity)
    @Field(() => BookEntity)
    book: BookEntity;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 수정 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @DeleteDateColumn()
    deleteAt: Date;
}
