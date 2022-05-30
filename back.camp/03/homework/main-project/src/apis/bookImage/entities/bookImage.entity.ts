/**
 * 책 이미지 Entity
 */

import BookEntity from 'src/apis/book/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'book_img' })
export default class BookImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // img url
    @Column()
    url: string;

    // 메인 이미지 여부
    @Column()
    isMain: boolean;

    // 책
    @ManyToOne(() => BookEntity)
    book: BookEntity;
}
