/**
 * 책 Entity
 */

import AuthorEntity from 'src/apis/author/entities/author.entity';
import PublisherEntity from 'src/apis/publisher/entities/publisher.entity';
import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'book' })
export default class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 제목
    @Column()
    title: string;

    // 소제목
    @Column()
    subtitle: string;

    // 설명
    @Column({ type: 'text' })
    description: string;

    // 쪽수
    @Column()
    page: number;

    // 10자리 ISBN
    @Column()
    isbn_10: string;

    // 13자리 ISBN
    @Column()
    isbn_13: string;

    // 출간일
    @Column()
    publish_at: Date;

    // 출판사
    @JoinColumn()
    @ManyToOne(() => PublisherEntity)
    publisher: PublisherEntity;

    // 저자
    @JoinColumn()
    @ManyToOne(() => AuthorEntity)
    author: AuthorEntity;
}
