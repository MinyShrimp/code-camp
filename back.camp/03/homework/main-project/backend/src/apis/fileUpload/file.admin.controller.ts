import { Controller, Get, Param } from '@nestjs/common';
import { FileEntity } from './entities/file.entity';
import { FileUploadService } from './fileUpload.service';

@Controller('admin')
export class FileAdminController {
    constructor(
        private readonly fileUploadService: FileUploadService, //
    ) {}

    @Get('/files')
    findAll(): Promise<FileEntity[]> {
        return this.fileUploadService.findAll();
    }

    @Get('/file/:id')
    findOne(
        @Param('id') fileID: string, //
    ): Promise<FileEntity> {
        return this.fileUploadService.findOne(fileID);
    }
}
