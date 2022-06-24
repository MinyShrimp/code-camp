import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePublisherInput } from './dto/createPublisher.input';
import { PublisherAdminRepository } from './entities/publisher.admin.repository';
import { PublisherEntity } from './entities/publisher.entity';
import { PublisherService } from './publisher.service';

@Controller('admin')
export class PublisherAdminContoller {
    constructor(
        private readonly publisherService: PublisherService,
        private readonly publisherRepository: PublisherAdminRepository,
    ) {}

    @Get('/publishers')
    findAll(): Promise<PublisherEntity[]> {
        return this.publisherRepository.findAll();
    }

    @Get('/publisher/names')
    findAllNames(): Promise<PublisherEntity[]> {
        return this.publisherRepository.findAllNames();
    }

    @Get('/publisher/:id')
    findOne(
        @Param('id') publisherID: string, //
    ) {
        return this.publisherRepository.findOne(publisherID);
    }

    @Post('/publisher')
    create(
        @Body() input: CreatePublisherInput, //
    ) {
        return this.publisherService.create(input);
    }

    @Delete('/publishers')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ) {
        await this.publisherRepository.bulkDelete(IDs);
        return 'delete ok';
    }
}
