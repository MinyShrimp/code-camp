import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

import { BookEntity } from './entities/book.entity';
import { CreateBookInput } from './dto/createBook.input';
import { UpdateBookInput } from './dto/updateBook.input';

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
        return await this.bookRepository.find({});
    }

    /**
     * 단일 책 조회
     * @param bookID
     * @returns 단일 책
     */
    async findOne(
        bookID: string, //
    ): Promise<BookEntity> {
        return await this.bookRepository.findOne({
            where: { id: bookID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 책 생성
     * @param createBookInput
     * @returns 생성된 책 정보
     */
    async create(createBookInput: CreateBookInput): Promise<BookEntity> {
        return await this.bookRepository.save({
            ...createBookInput,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 책 정보 수정
     * @param bookID
     * @param updateBookInput
     * @returns 수정된 책 정보
     */
    async update(
        bookID: string,
        updateBookInput: UpdateBookInput,
    ): Promise<BookEntity> {
        const book = await this.findOne(bookID);
        const newBook = {
            ...book,
            id: bookID,
            ...updateBookInput,
        };

        return await this.bookRepository.save(newBook);
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
        const isSuccess = result ? true : false;

        return new ResultMessage({
            id: bookID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Book Restore'
                : 'Failed Book Restore',
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
        const isSuccess = result ? true : false;

        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? 'Completed All Book Delete'
                : 'Failed All Book Delete',
        });
    }

    /**
     * 모든 책 정보 삭제 ( 삭제 X )
     * @returns ResultMessage
     */
    async softDeleteAll(): Promise<ResultMessage> {
        const result = await this.bookRepository.softDelete({});
        const isSuccess = result ? true : false;

        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? 'Completed All Book Soft Delete'
                : 'Failed All Book Soft Delete',
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
        const isSuccess = result ? true : false;

        return new ResultMessage({
            id: bookID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Book Delete'
                : 'Failed Book Delete',
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
        const isSuccess = result ? true : false;

        return new ResultMessage({
            id: bookID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Book Soft Delete'
                : 'Failed Book Soft Delete',
        });
    }
}
