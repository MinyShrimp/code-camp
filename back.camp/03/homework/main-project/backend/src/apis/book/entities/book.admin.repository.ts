import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { BookEntity } from './book.entity';

@Injectable()
export class BookAdminRepository {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
    ) {}

    private readonly _selector = [
        'book.id',
        'book.title',
        'book.subtitle',
        'book.description',
        'book.page',
        'book.isbn_10',
        'book.isbn_13',
        'book.publishAt',
        'publisher.id',
        'publisher.name',
        'author.id',
        'author.name',
        'book.createAt',
        'book.updateAt',
    ];

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 책 조회
     * @returns 모든 책 목록
     */
    async findAll(): Promise<BookEntity[]> {
        return await this.bookRepository
            .createQueryBuilder('book')
            .select(this._selector)
            .withDeleted()
            .leftJoin('book.author', 'author')
            .leftJoin('book.publisher', 'publisher')
            .orderBy('book.createAt')
            .getMany();
    }

    /**
     * 단일 책 조회
     * @param bookID
     * @returns 단일 책
     */
    async findOne(
        bookID: string, //
    ): Promise<BookEntity> {
        return await this.bookRepository
            .createQueryBuilder('book')
            .select([
                ...this._selector,
                'book_image.id',
                'file.url',
                'book_image.isMain',
                'book.deleteAt',
            ])
            .withDeleted()
            .where('book.id=:id', { id: bookID })
            .leftJoin('book.author', 'author')
            .leftJoin('book.publisher', 'publisher')
            .leftJoin('book.book_images', 'book_image')
            .leftJoin('book_image.file', 'file')
            .orderBy('book_image.isMain', 'DESC')
            .getOne();
    }
}
