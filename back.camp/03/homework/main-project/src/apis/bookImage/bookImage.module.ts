import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import BookImageEntity from './entities/bookImage.entity';
import BookImageResolver from './bookImage.resolver';
import BookImageService from './bookImage.service';

/**
 * 책 이미지 API
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([
            BookImageEntity, //
        ]),
    ],
    providers: [
        BookImageResolver, //
        BookImageService,
    ],
})
export default class BookImageModule {}
