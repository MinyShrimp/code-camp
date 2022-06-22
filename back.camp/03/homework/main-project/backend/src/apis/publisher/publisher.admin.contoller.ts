import { Controller, Get, Param } from '@nestjs/common';
import { PublisherEntity } from './entities/publisher.entity';
import { PublisherAdminService } from './publisher.admin.service';

@Controller('admin')
export class PublisherAdminContoller {
    constructor(
        private readonly publisherService: PublisherAdminService, //
    ) {}

    @Get('/publishers')
    findAll(): Promise<PublisherEntity[]> {
        return this.publisherService.findAll();
    }

    @Get('/publisher/names')
    findAllNames(): Promise<PublisherEntity[]> {
        return this.publisherService.findAllNames();
    }

    @Get('/publisher/:id')
    findOne(
        @Param('id') publisherID: string, //
    ) {
        return this.publisherService.findOne(publisherID);
    }
}
