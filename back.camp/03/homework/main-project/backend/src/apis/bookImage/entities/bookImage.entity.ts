import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';
import { FileUploadEntity } from 'src/apis/fileUpload/entities/fileUpload.entity';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne,
} from 'typeorm';

import { BookEntity } from '../../book/entities/book.entity';

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
    @JoinColumn({ name: 'uploadImageId' })
    @OneToOne(
        () => FileUploadEntity, //
        (uploadImage) => uploadImage.bookImage,
        { eager: true },
    )
    @Field(
        () => FileUploadEntity, //
        { description: '업로드된 이미지 ID' },
    )
    uploadImage: FileUploadEntity;

    // 책
    @JoinColumn()
    @ManyToOne(
        () => BookEntity, //
        (book) => book.book_images,
    )
    @Field(() => BookEntity)
    book: BookEntity;
}
