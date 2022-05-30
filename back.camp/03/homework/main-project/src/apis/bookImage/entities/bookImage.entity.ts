/**
 * 책 이미지 Entity
 */

import BookEntity from 'src/apis/book/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'book_img' })
export default class BookImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    isMain: boolean;

    @ManyToOne(() => BookEntity)
    book: BookEntity;
}
