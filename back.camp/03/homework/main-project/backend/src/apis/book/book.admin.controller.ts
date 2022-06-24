import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { BookAdminRepository } from './entities/book.admin.repository';
import { BookEntity } from './entities/book.entity';

@Controller('admin')
export class BookAdminController {
    constructor(
        private readonly bookRepository: BookAdminRepository, //
    ) {}

    @Get('/books')
    findAll(): Promise<BookEntity[]> {
        return this.bookRepository.findAll();
    }

    @Get('/book/names')
    findAllName(): Promise<BookEntity[]> {
        return this.bookRepository.findAllName();
    }

    @Get('/book/:id')
    findOne(
        @Param('id') bookID: string, //
    ): Promise<BookEntity> {
        return this.bookRepository.findOne(bookID);
    }

    @Delete('/books')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ) {
        await this.bookRepository.bulkDelete(IDs);
        return 'delete ok';
    }
}
