import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileUploadModule } from '../fileUpload/fileUpload.module';

import { BookImageEntity } from './entities/bookImage.entity';
import { BookImageService } from './bookImage.service';
import { BookImageAdminContoller } from './bookImage.admin.controller';
import { BookImageAdminRepository } from './entities/bookImage.admin.repository';
import { BookImageAdminService } from './bookImage.admin.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BookImageEntity]), //
        FileUploadModule,
    ],
    exports: [BookImageService],
    controllers: [
        BookImageAdminContoller, //
    ],
    providers: [
        BookImageService,
        BookImageAdminService,
        BookImageAdminRepository,
    ],
})
export class BookImageModule {}
