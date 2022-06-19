import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';

@Controller('admin')
export class BookAdminController {
    constructor(
        private readonly bookService: BookService, //
    ) {}

    @Get('/books')
    findAll(): Promise<BookEntity[]> {
        return this.bookService.findAll();
    }

    @Get('/book/:id')
    findOne(
        @Param('id') bookID: string, //
    ): Promise<BookEntity> {
        return this.bookService.findOne(bookID);
    }
}
