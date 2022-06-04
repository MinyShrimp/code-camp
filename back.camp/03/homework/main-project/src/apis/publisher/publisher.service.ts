import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import PublisherEntity from './entities/publisher.entity';
import CreatePublisherInput from './dto/createPublisher.input';
import UpdatePublisherInput from './dto/updatePublisher.input';

@Injectable()
export default class PublisherService {
    constructor(
        @InjectRepository(PublisherEntity)
        private readonly publisherRepository: Repository<PublisherEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    async findOne(
        publisherID: string, //
    ): Promise<PublisherEntity> {
        return await this.publisherRepository.findOne({
            where: { id: publisherID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    async create(
        createPublisherInput: CreatePublisherInput,
    ): Promise<PublisherEntity> {
        const input = createPublisherInput;

        return await this.publisherRepository.save({
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    async update(
        publisherID: string,
        updatePublisherInput: UpdatePublisherInput,
    ): Promise<PublisherEntity> {
        const input = updatePublisherInput;

        const publisher = await this.findOne(publisherID);

        return await this.publisherRepository.save({
            ...publisher,
            ...input,
        });
    }

    async restore(
        publisherID: string, //
    ): Promise<ResultMessage> {
        const result = await this.publisherRepository.restore({
            id: publisherID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: publisherID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Publisher Restore'
                : 'Failed Publisher Restore',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async delete(
        publisherID: string, //
    ): Promise<ResultMessage> {
        const result = await this.publisherRepository.delete({
            id: publisherID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: publisherID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Publisher Delete'
                : 'Failed Publisher Delete',
        });
    }

    async softDelete(
        publisherID: string, //
    ): Promise<ResultMessage> {
        const result = await this.publisherRepository.softDelete({
            id: publisherID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: publisherID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Publisher Soft Delete'
                : 'Failed Publisher Soft Delete',
        });
    }
}
