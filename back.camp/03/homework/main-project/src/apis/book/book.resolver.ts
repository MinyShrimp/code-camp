import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import BookEntity from './entities/book.entity';
import CreateBookInput from './dto/createBook.input';
import UpdateBookInput from './dto/updateBook.input';
import BookService from './book.service';

@Resolver()
export default class BookResolver {
    constructor(
        private readonly bookService: BookService, //
    ) {}

    // GET 모든 책 조회
    @Query(() => [BookEntity])
    fetchBooks(): Promise<BookEntity[]> {
        return this.bookService.findAll();
    }

    // GET 단일 책 조회
    @Query(() => BookEntity)
    fetchBook(
        @Args('bookID') bookID: string, //
    ): Promise<BookEntity> {
        return this.bookService.findOne(bookID);
    }

    // POST 책 생성
    @Mutation(() => BookEntity)
    createBook(
        @Args('createBookInput') createBookInput: CreateBookInput,
    ): Promise<BookEntity> {
        return this.bookService.create(createBookInput);
    }

    // PATCH 책 수정
    @Mutation(() => BookEntity)
    updateBook(
        @Args('bookID') bookID: string, //
        @Args('updateBookInput') updateBookInput: UpdateBookInput,
    ): Promise<BookEntity> {
        return this.bookService.update(bookID, updateBookInput);
    }

    // DELETE 모든 책 삭제
    @Mutation(() => String)
    async deleteBookAll(): Promise<string> {
        await this.bookService.deleteAll();
        return 'ok';
    }
}
