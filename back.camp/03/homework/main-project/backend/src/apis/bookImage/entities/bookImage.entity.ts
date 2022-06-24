import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne,
    DeleteDateColumn,
} from 'typeorm';

import { BookEntity } from '../../book/entities/book.entity';
import { FileEntity } from 'src/apis/fileUpload/entities/file.entity';

@Entity({ name: 'book_img' })
@ObjectType({ description: '책 이미지 Entity' })
export class BookImageEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 메인 이미지 여부
    @Column()
    @IsBoolean()
    @Field(
        () => Boolean, //
        { description: '메인 이미지 여부' },
    )
    isMain: boolean;

    // 업로드된 이미지
    @JoinColumn({ name: 'fileId' })
    @OneToOne(
        () => FileEntity, //
        (file) => file.bookImage,
        { eager: true },
    )
    @Field(
        () => FileEntity, //
        { description: '업로드된 이미지 ID' },
    )
    file: FileEntity;

    // 책
    @JoinColumn({ name: 'bookId' })
    @ManyToOne(
        () => BookEntity, //
        (book) => book.book_images,
        { cascade: true, onDelete: 'CASCADE' },
    )
    @Field(() => BookEntity)
    book: BookEntity;

    @DeleteDateColumn()
    deleteAt: Date;
}
