import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookImageEntity } from './entities/bookImage.entity';
import { BookImageService } from './bookImage.service';

@Module({
    imports: [TypeOrmModule.forFeature([BookImageEntity])],
    exports: [BookImageService],
    providers: [BookImageService],
})
export class BookImageModule {}
