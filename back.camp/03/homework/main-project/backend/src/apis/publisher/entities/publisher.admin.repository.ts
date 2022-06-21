import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublisherEntity } from './publisher.entity';

@Injectable()
export class PublisherAdminRepository {
    constructor(
        @InjectRepository(PublisherEntity)
        private readonly publisherRepository: Repository<PublisherEntity>,
    ) {}

    private readonly _selector = [
        'pub.id',
        'pub.name',
        'pub.description',
        'pub.createAt',
        'pub.updateAt',
    ];

    async findAll(): Promise<PublisherEntity[]> {
        return await this.publisherRepository
            .createQueryBuilder('pub')
            .select(this._selector)
            .withDeleted()
            .orderBy('pub.createAt')
            .getMany();
    }

    async findOne(
        publisherID: string, //
    ): Promise<PublisherEntity> {
        return await this.publisherRepository
            .createQueryBuilder('pub')
            .select([...this._selector, 'pub.deleteAt'])
            .where('pub.id=:id', { id: publisherID })
            .withDeleted()
            .getOne();
    }
}
