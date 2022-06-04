import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import BookEntity from './entities/book.entity';
import BookResolver from './book.resolver';
import BookService from './book.service';

/**
 * 책 API
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([
            BookEntity, //
        ]),
    ],
    providers: [
        BookResolver, //
        BookService,
    ],
})
export default class BookModule {}
