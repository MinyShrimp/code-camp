import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileUploadEntity } from './entities/fileUpload.entity';
import { FileAdminController } from './file.admin.controller';
import { FileUploadResolver } from './fileUpload.resolver';
import { FileUploadService } from './fileUpload.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FileUploadEntity, //
        ]),
    ],
    exports: [FileUploadService],
    controllers: [FileAdminController],
    providers: [
        FileUploadResolver, //
        FileUploadService,
    ],
})
export class FileUploadModule {}
