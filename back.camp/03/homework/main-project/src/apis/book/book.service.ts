import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import BookEntity from './entities/book.entity';
import CreateBookInput from './dto/createBook.input';
import UpdateBookInput from './dto/updateBook.input';

@Injectable()
export default class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
    ) {}

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
    async findOne(bookID: string): Promise<BookEntity> {
        return await this.bookRepository.findOne({
            id: bookID,
        });
    }

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

    /**
     * 책 정보 수정
     * @param productID
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
     * 모든 상품 삭제
     */
    async deleteAll(): Promise<void> {
        await this.bookRepository.delete({});
    }
}
