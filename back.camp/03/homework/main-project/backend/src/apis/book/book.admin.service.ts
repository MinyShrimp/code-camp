import { Injectable } from '@nestjs/common';
import { BookAdminRepository } from './entities/book.admin.repository';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookAdminService {
    constructor(
        private readonly bookRepository: BookAdminRepository, //
    ) {}

    findAll(): Promise<BookEntity[]> {
        return this.bookRepository.findAll();
    }

    findOne(
        bookID: string, //
    ): Promise<BookEntity> {
        return this.bookRepository.findOne(bookID);
    }
}
