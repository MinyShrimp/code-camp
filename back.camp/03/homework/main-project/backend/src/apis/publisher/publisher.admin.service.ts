import { Injectable } from '@nestjs/common';
import { PublisherAdminRepository } from './entities/publisher.admin.repository';

@Injectable()
export class PublisherAdminService {
    constructor(
        private readonly publisherAdminRepository: PublisherAdminRepository,
    ) {}

    async findAll() {
        return this.publisherAdminRepository.findAll();
    }

    async findAllNames() {
        return this.publisherAdminRepository.findAllNames();
    }

    async findOne(
        publisherID: string, //
    ) {
        return this.publisherAdminRepository.findOne(publisherID);
    }
}
