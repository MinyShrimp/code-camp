import { Controller, Get, Param } from '@nestjs/common';
import { BookImageAdminService } from './bookImage.admin.service';
import { BookImageEntity } from './entities/bookImage.entity';

@Controller('admin')
export class BookImageAdminContoller {
    constructor(
        private readonly bookImageService: BookImageAdminService, //
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
