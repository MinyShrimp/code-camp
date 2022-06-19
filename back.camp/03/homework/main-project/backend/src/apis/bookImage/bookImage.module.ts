import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileUploadModule } from '../fileUpload/fileUpload.module';

import { BookImageEntity } from './entities/bookImage.entity';
import { BookImageService } from './bookImage.service';
import { BookImageAdminContoller } from './bookImage.admin.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BookImageEntity]), FileUploadModule],
    exports: [BookImageService],
    controllers: [BookImageAdminContoller],
    providers: [BookImageService],
})
export class BookImageModule {}
