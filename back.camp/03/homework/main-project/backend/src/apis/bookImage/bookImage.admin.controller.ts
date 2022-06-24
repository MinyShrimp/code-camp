import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { BookImageAdminRepository } from './entities/bookImage.admin.repository';
import { BookImageEntity } from './entities/bookImage.entity';

@Controller('admin')
export class BookImageAdminContoller {
    constructor(
        private readonly bookImageRepository: BookImageAdminRepository,
    ) {}

    @Get('/book-images')
    findAll(): Promise<BookImageEntity[]> {
        return this.bookImageRepository.findAll();
    }

    @Get('/book-image/:id')
    findOne(
        @Param('id') bookImageID: string, //
    ): Promise<BookImageEntity> {
        return this.bookImageRepository.findOne(bookImageID);
    }

    @Delete('/book-images')
    bulkDelete(@Body() IDs: Array<string>) {
        return 'Not Allow';
    }
}
