import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileUploadEntity } from './entities/fileUpload.entity';
import { FileUploadResolver } from './fileUpload.resolver';
import { FileUploadService } from './fileUpload.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FileUploadEntity, //
        ]),
    ],
    exports: [FileUploadService],
    providers: [
        FileUploadResolver, //
        FileUploadService,
    ],
})
export class FileUploadModule {}
