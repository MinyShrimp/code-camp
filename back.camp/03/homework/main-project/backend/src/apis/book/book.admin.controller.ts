import { Controller, Get, Param } from '@nestjs/common';
import { BookAdminService } from './book.admin.service';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';

@Controller('admin')
export class BookAdminController {
    constructor(
        private readonly bookService: BookService, //
        private readonly bookAdminService: BookAdminService,
    ) {}

    @Get('/books')
    findAll(): Promise<BookEntity[]> {
        return this.bookAdminService.findAll();
    }

    @Get('/book/names')
    findAllName(): Promise<BookEntity[]> {
        return this.bookAdminService.findAllName();
    }

    @Get('/book/:id')
    findOne(
        @Param('id') bookID: string, //
    ): Promise<BookEntity> {
        return this.bookAdminService.findOne(bookID);
    }
}
