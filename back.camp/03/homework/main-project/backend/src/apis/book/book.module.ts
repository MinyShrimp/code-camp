import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorModule } from '../author/author.module';
import { PublisherModule } from '../publisher/publisher.module';
import { BookImageModule } from '../bookImage/bookImage.module';

import { BookEntity } from './entities/book.entity';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BookEntity, //
        ]),
        AuthorModule,
        PublisherModule,
        BookImageModule,
    ],
    exports: [BookService],
    providers: [
        BookResolver, //
        BookService,
    ],
})
export class BookModule {}
