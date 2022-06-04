import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import BookEntity from './entities/book.entity';
import CreateBookInput from './dto/createBook.input';
import UpdateBookInput from './dto/updateBook.input';
import BookService from './book.service';

@Resolver()
export default class BookResolver {
    constructor(
        private readonly bookService: BookService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

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

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    // POST 책 생성
    @Mutation(() => BookEntity)
    createBook(
        @Args('createBookInput') createBookInput: CreateBookInput,
    ): Promise<BookEntity> {
        return this.bookService.create(createBookInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    // PATCH 책 수정
    @Mutation(() => BookEntity)
    updateBook(
        @Args('bookID') bookID: string,
        @Args('updateBookInput') updateBookInput: UpdateBookInput,
    ): Promise<BookEntity> {
        return this.bookService.update(bookID, updateBookInput);
    }

    // POST 책 삭제 취소
    @Mutation(() => ResultMessage)
    restoreBook(
        @Args('bookID') bookID: string, //
    ): Promise<ResultMessage> {
        return this.bookService.restore(bookID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    // DELETE 모든 책 삭제 ( 삭제 O )
    @Mutation(() => ResultMessage)
    async deleteBookAll(): Promise<ResultMessage> {
        return await this.bookService.deleteAll();
    }

    // DELETE 단일 책 삭제 ( 삭제 O )
    @Mutation(() => ResultMessage)
    async deleteBook(
        @Args('bookID') bookID: string, //
    ): Promise<ResultMessage> {
        return await this.bookService.delete(bookID);
    }

    // DELETE 단일 책 삭제 ( 삭제 X )
    @Mutation(() => ResultMessage)
    async softDeleteBook(
        @Args('bookID') bookID: string, //
    ): Promise<ResultMessage> {
        return await this.bookService.softDelete(bookID);
    }
}
