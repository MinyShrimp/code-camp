import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';

import { AuthorEntity } from '../author/entities/author.entity';
import { PublisherEntity } from '../publisher/entities/publisher.entity';

import { BookEntity } from './entities/book.entity';
import { CreateBookDTO } from './dto/createBook.dto';
import { UpdateBookDTO } from './dto/updateBook.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 책 조회
     * @returns 모든 책 목록
     */
    async findAll(): Promise<BookEntity[]> {
        return await this.bookRepository.find({
            relations: ['publisher', 'author', 'book_images'],
        });
    }

    /**
     * 단일 책 조회
     * @param bookID
     * @returns 단일 책
     */
    async findOne(
        bookID: string, //
    ): Promise<BookEntity> {
        // const book = await this.bookRepository.findOne({
        //     where: { id: bookID },
        //     relations: ['publisher', 'author', 'book_images'],
        // });
        const book = await this.bookRepository
            .createQueryBuilder('book')
            .select([
                'book.id',
                'book.title',
                'book.subtitle',
                'book.description',
                'book.page',
                'book.isbn_10',
                'book.isbn_13',
                'book.publish_at',
                'publisher.id',
                'publisher.name',
                'publisher.description',
                'author.id',
                'author.name',
                'author.description',
                'book_image.id',
                'book_image.url',
                'book_image.isMain',
            ])
            .leftJoinAndSelect('book.publisher', 'publisher')
            .leftJoinAndSelect('book.author', 'author')
            .leftJoinAndSelect('book.book_images', 'book_image')
            .where(`book.id = '${bookID}'`)
            .getOne();
        if (!book) {
            throw new ConflictException(MESSAGES.BOOK_FIND_ONE_FAILED);
        }
        return book;
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 책 생성
     * @param createBookDto
     * @param author
     * @param publisher
     * @returns 생성된 책 정보
     */
    async create(
        createBookDto: CreateBookDTO, //
        author: AuthorEntity,
        publisher: PublisherEntity,
    ): Promise<BookEntity> {
        return await this.bookRepository.save({
            ...createBookDto,
            author,
            publisher,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 책 정보 수정
     * @param updateBookDto
     * @param book
     * @returns 수정된 책 정보
     */
    async update(
        updateBookDto: UpdateBookDTO,
        book: BookEntity,
    ): Promise<BookEntity> {
        return await this.bookRepository.save({
            ...book,
            ...updateBookDto,
        });
    }

    /**
     * 책 정보 삭제 취소
     * @param bookID
     * @returns ResultMessage
     */
    async restore(
        bookID: string, //
    ): Promise<ResultMessage> {
        const result = await this.bookRepository.restore({
            id: bookID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: bookID,
            isSuccess,
            contents: isSuccess
                ? MESSAGES.BOOK_RESTORE_SUCCESSED
                : MESSAGES.BOOK_RESTORE_FAILED,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 모든 책 정보 삭제 ( 삭제 O )
     * @returns ResultMessage
     */
    async deleteAll(): Promise<ResultMessage> {
        const result = await this.bookRepository.delete({});
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? MESSAGES.BOOK_DELETE_ALL_SUCCESSED
                : MESSAGES.BOOK_DELETE_ALL_FAILED,
        });
    }

    /**
     * 모든 책 정보 삭제 ( 삭제 X )
     * @returns ResultMessage
     */
    async softDeleteAll(): Promise<ResultMessage> {
        const result = await this.bookRepository.softDelete({});
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? MESSAGES.BOOK_SOFT_DELETE_ALL_SUCCESSED
                : MESSAGES.BOOK_SOFT_DELETE_ALL_FAILED,
        });
    }

    /**
     * 단일 책 정보 삭제 ( 삭제 O )
     * @param bookID
     * @returns ResultMessage
     */
    async delete(
        bookID: string, //
    ): Promise<ResultMessage> {
        const result = await this.bookRepository.delete({
            id: bookID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: bookID,
            isSuccess,
            contents: isSuccess
                ? MESSAGES.BOOK_DELETE_SUCCESSED
                : MESSAGES.BOOK_DELETE_FAILED,
        });
    }

    /**
     * 단일 책 정보 삭제 ( 삭제 X )
     * @param bookID
     * @returns ResultMessage
     */
    async softDelete(
        bookID: string, //
    ): Promise<ResultMessage> {
        const result = await this.bookRepository.softDelete({
            id: bookID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: bookID,
            isSuccess,
            contents: isSuccess
                ? MESSAGES.BOOK_SOFT_DELETE_SUCCESSED
                : MESSAGES.BOOK_SOFT_DELETE_FAILED,
        });
    }
}
