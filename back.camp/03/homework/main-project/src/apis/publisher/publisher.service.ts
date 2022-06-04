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

    /**
     * 출판사 단일 정보 조회
     * @param publisherID
     * @returns 조회된 출판사 정보
     */
    async findOne(
        publisherID: string, //
    ): Promise<PublisherEntity> {
        return await this.publisherRepository.findOne({
            where: { id: publisherID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 출판사 정보 생성
     * @param createPublisherInput
     * @returns 생성된 출판사 정보
     */
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

    /**
     * 출판사 정보 수정
     * @param publisherID
     * @param updatePublisherInput
     * @returns 수정된 출판사 정보
     */
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

    /**
     * 출판사 삭제 취소
     * @param publisherID
     * @returns ResultMessage
     */
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

    /**
     * 단일 출판사 삭제 ( 삭제 O )
     * @param publisherID
     * @returns ResultMessage
     */
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

    /**
     * 단일 출판사 삭제 ( 삭제 X )
     * @param publisherID
     * @returns ResultMessage
     */
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
