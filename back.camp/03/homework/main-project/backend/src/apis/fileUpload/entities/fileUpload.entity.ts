import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BookImageEntity } from 'src/apis/bookImage/entities/bookImage.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

/* FileUpload Entity */
@Entity({ name: 'upload_file' })
@ObjectType({ description: 'FileUpload Entity' })
export class FileUploadEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field(() => String, { description: '이름' })
    name: string;

    @Column()
    @Field(() => String, { description: 'URL' })
    url: string;

    @OneToOne(
        () => BookImageEntity, //
        (bookImage) => bookImage.uploadImage,
        { nullable: true },
    )
    @Field(() => BookImageEntity, { nullable: true })
    bookImage?: BookImageEntity;

    @CreateDateColumn()
    createAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}
