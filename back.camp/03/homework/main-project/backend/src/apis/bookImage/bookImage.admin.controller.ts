import { Controller, Get, Param } from '@nestjs/common';
import { BookImageService } from './bookImage.service';
import { BookImageEntity } from './entities/bookImage.entity';

@Controller('admin')
export class BookImageAdminContoller {
    constructor(
        private readonly bookImageService: BookImageService, //
    ) {}

    @Get('/book-images')
    findAll(): Promise<BookImageEntity[]> {
        return this.bookImageService.findAll();
    }

    @Get('/book-image/:id')
    findOne(
        @Param('id') bookImageID: string, //
    ) {
        return this.bookImageService.findOne(bookImageID);
    }
}
