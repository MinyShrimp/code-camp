import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import PublisherEntity from './entities/publisher.entity';
import CreatePublisherInput from './dto/createPublisher.input';
import UpdatePublisherInput from './dto/updatePublisher.input';
import PublisherService from './publisher.service';

@Resolver()
export default class PublisherResolver {
    constructor(
        private readonly publisherService: PublisherService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/publisher/:id
     * @param publisherID
     * @returns 조회된 출판사 단일 정보
     *
     * 출판사 정보 조회
     */
    @Query(() => PublisherEntity)
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
     *
     * 출판사 정보 생성
     */
    @Mutation(() => PublisherEntity)
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
     *
     * 출판사 정보 수정
     */
    @Mutation(() => PublisherEntity)
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
     *
     * 출판사 정보 삭제 취소
     */
    @Mutation(() => ResultMessage)
    restorePublisher(
        @Args('publisherID') publisherID: string, //
    ): Promise<ResultMessage> {
        return this.publisherService.restore(publisherID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /api/publisher/:id/:admin
     * @param publisherID
     * @returns ResultMessage
     *
     * 출판사 정보 삭제 ( 삭제 O )
     */
    @Mutation(() => ResultMessage)
    deletePublisher(
        @Args('publisherID') publisherID: string, //
    ): Promise<ResultMessage> {
        return this.publisherService.delete(publisherID);
    }

    /**
     * DELETE /api/publisher/:id
     * @param publisherID
     * @returns ResultMessage
     *
     * 출판사 정보 삭제 ( 삭제 X )
     */
    @Mutation(() => ResultMessage)
    softDeletePublisher(
        @Args('publisherID') publisherID: string, //
    ): Promise<ResultMessage> {
        return this.publisherService.softDelete(publisherID);
    }
}
