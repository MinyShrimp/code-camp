import { Controller, Get, Param } from '@nestjs/common';
import { PublisherEntity } from './entities/publisher.entity';
import { PublisherService } from './publisher.service';

@Controller('admin')
export class PublisherAdminContoller {
    constructor(
        private readonly publisherService: PublisherService, //
    ) {}

    @Get('/publishers')
    findAll(): Promise<PublisherEntity[]> {
        return this.publisherService.findAll();
    }

    @Get('/publisher/:id')
    findOne(
        @Param('id') publisherID: string, //
    ) {
        return this.publisherService.findOne(publisherID);
    }
}
