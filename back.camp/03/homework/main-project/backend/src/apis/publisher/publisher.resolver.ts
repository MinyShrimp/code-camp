import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ResultMessage } from '../../commons/dto/ResultMessage.dto';

import { PublisherEntity } from './entities/publisher.entity';
import { CreatePublisherInput } from './dto/createPublisher.input';
import { UpdatePublisherInput } from './dto/updatePublisher.input';
import { PublisherService } from './publisher.service';

/* 출판사 API */
@Resolver()
export class PublisherResolver {
    constructor(
        private readonly publisherService: PublisherService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/publisher/:id
     * @param publisherID
     * @returns 조회된 출판사 단일 정보
     */
    @Query(
        () => PublisherEntity, //
        { description: '출판사 정보 조회' },
    )
    fetchPublisher(
        @Args('publisherID') publisherID: string, //
    ): Promise<PublisherEntity> {
        return this.publisherService.findOne(publisherID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/publisher
     * @param createPublisherInput
     * @returns 생성된 출판사 정보
     */
    @Mutation(
        () => PublisherEntity, //
        { description: '출판사 정보 생성' },
    )
    createPubliser(
        @Args('createPublisherInput')
        createPublisherInput: CreatePublisherInput,
    ): Promise<PublisherEntity> {
        return this.publisherService.create(createPublisherInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/publisher/:id
     * @param publisherID
     * @param updatePublisherInput
     * @returns 수정된 출판사 정보
     */
    @Mutation(
        () => PublisherEntity, //
        { description: '출판사 정보 수정' },
    )
    updatePublisher(
        @Args('publisherID')
        publisherID: string,
        @Args('updatePublisherInput')
        updatePublisherInput: UpdatePublisherInput,
    ): Promise<PublisherEntity> {
        return this.publisherService.update(publisherID, updatePublisherInput);
    }

    /**
     * PUT /api/publisher/:id
     * @param publisherID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '출판사 정보 삭제 취소' },
    )
    restorePublisher(
        @Args('publisherID') publisherID: string, //
    ): Promise<ResultMessage> {
        return this.publisherService.restore(publisherID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/publisher/:id
     * @param publisherID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '출판사 정보 삭제 ( Real )' },
    )
    deletePublisher(
        @Args('publisherID') publisherID: string, //
    ): Promise<ResultMessage> {
        return this.publisherService.delete(publisherID);
    }

    /**
     * DELETE /api/publisher/:id
     * @param publisherID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '출판사 정보 삭제 ( Soft )' },
    )
    softDeletePublisher(
        @Args('publisherID') publisherID: string, //
    ): Promise<ResultMessage> {
        return this.publisherService.softDelete(publisherID);
    }
}
