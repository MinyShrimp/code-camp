import { Controller, Get, Param } from '@nestjs/common';
import { FileUploadEntity } from './entities/fileUpload.entity';
import { FileUploadService } from './fileUpload.service';

@Controller('admin')
export class FileAdminController {
    constructor(
        private readonly fileUploadService: FileUploadService, //
    ) {}

    @Get('/files')
    findAll(): Promise<FileUploadEntity[]> {
        return this.fileUploadService.findAll();
    }

    @Get('/file/:id')
    findOne(
        @Param('id') fileID: string, //
    ): Promise<FileUploadEntity> {
        return this.fileUploadService.findOne(fileID);
    }
}
