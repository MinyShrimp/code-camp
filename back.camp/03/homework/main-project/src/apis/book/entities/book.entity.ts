/**
 * 책 Entity
 */

import AuthorEntity from 'src/apis/author/entities/author.entity';
import PublisherEntity from 'src/apis/publisher/entities/publisher.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'book' })
export default class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @Column()
    description: string;

    @Column()
    page: number;

    @Column()
    isbn_10: string;

    @Column()
    isbn_13: string;

    @Column()
    publish_at: Date;

    @JoinColumn()
    @ManyToOne(() => PublisherEntity)
    publisher: PublisherEntity;

    @JoinColumn()
    @ManyToOne(() => AuthorEntity)
    author: AuthorEntity;
}
