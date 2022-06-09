import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';

import { AuthorService } from '../author/author.service';
import { PublisherService } from '../publisher/publisher.service';
import { BookImageService } from '../bookImage/bookImage.service';

import { BookEntity } from './entities/book.entity';
import { CreateBookInput } from './dto/createBook.input';
import { UpdateBookInput } from './dto/updateBook.input';
import { BookService } from './book.service';

/* 책 API */
@Resolver()
export class BookResolver {
    constructor(
        private readonly bookService: BookService,
        private readonly authorService: AuthorService,
        private readonly publisherService: PublisherService,
        private readonly bookImageService: BookImageService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/books
     * @response 조회된 책 목록
     */
    @Query(
        () => [BookEntity], //
        { description: '모든 책 조회' },
    )
    fetchBooks(): Promise<BookEntity[]> {
        return this.bookService.findAll();
    }

    /**
     * GET /api/book/:id
     * @param bookID
     * @response 조회된 책 단일 정보
     */
    @Query(
        () => BookEntity, //
        { description: '단일 책 조회' },
    )
    fetchBook(
        @Args('bookID') bookID: string, //
    ): Promise<BookEntity> {
        return this.bookService.findOne(bookID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/book
     * @param createBookInput
     * @response 생성된 책 정보
     */
    @Mutation(
        () => BookEntity, //
        { description: '책 정보 생성' },
    )
    async createBook(
        @Args('createBookInput') createBookInput: CreateBookInput,
    ): Promise<BookEntity> {
        const {
            book_imgs, //
            author_id,
            publisher_id,
            ...input
        } = createBookInput;

        const author = await this.authorService.findOne(author_id);
        const publisher = await this.publisherService.findOne(publisher_id);
        const book = await this.bookService.create(input, author, publisher);
        const book_images = await this.bookImageService.create(book, book_imgs);

        this.bookService.update(
            { ...input, author, publisher, book_images },
            book,
        );

        return await this.bookService.findOne(book.id);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/book/:id
     * @param bookID
     * @param updateBookInput
     * @response 수정된 책 정보
     */
    @Mutation(
        () => BookEntity, //
        { description: '책 정보 수정' },
    )
    async updateBook(
        @Args('bookID') bookID: string,
        @Args('updateBookInput') updateBookInput: UpdateBookInput,
    ): Promise<BookEntity> {
        const {
            book_imgs,
            author_id,
            publisher_id, //
            ...input
        } = updateBookInput;

        const book = await this.bookService.findOne(bookID);
        const author = await this.authorService.findOne(author_id);
        const publisher = await this.publisherService.findOne(publisher_id);

        return this.bookService.update({ ...input, author, publisher }, book);
    }

    /**
     * PUT /api/book/:id
     * @param bookID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '책 정보 삭제 취소' },
    )
    restoreBook(
        @Args('bookID') bookID: string, //
    ): Promise<ResultMessage> {
        return this.bookService.restore(bookID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/books/
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '모든 책 삭제 ( Real )' },
    )
    async deleteBookAll(): Promise<ResultMessage> {
        await this.bookImageService.deleteAll();
        return await this.bookService.deleteAll();
    }

    /**
     * DELETE /admin/book/:id
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '단일 책 삭제 ( Real )' },
    )
    async deleteBook(
        @Args('bookID') bookID: string, //
    ): Promise<ResultMessage> {
        return await this.bookService.delete(bookID);
    }

    /**
     * DELETE /api/book/:id
     * @param bookID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '단일 책 삭제 ( Soft )' },
    )
    async softDeleteBook(
        @Args('bookID') bookID: string, //
    ): Promise<ResultMessage> {
        return await this.bookService.softDelete(bookID);
    }
}
