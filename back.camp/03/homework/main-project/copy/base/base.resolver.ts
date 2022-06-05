import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import { BaseEntity } from './entities/base.entity';
import { CreateBaseInput } from './dto/createBase.input';
import { UpdateBaseInput } from './dto/updateBase.input';
import { BaseService } from './base.service';

/* Base API */
@Resolver()
export class BaseResolver {
    private static readonly NAME = ``;

    constructor(
        private readonly baseService: BaseService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/bases
     * @response 조회된 전체 목록
     */
    @Query(
        () => [BaseEntity], //
        { description: `${BaseResolver.NAME} 전체 조회` },
    )
    fetchBases(): Promise<BaseEntity[]> {
        return this.baseService.findAll();
    }

    /**
     * GET /api/base/:id
     * @param baseID
     * @response 조회된 단일 목록
     */
    @Query(
        () => BaseEntity, //
        { description: `${BaseResolver.NAME} 단일 조회` },
    )
    fetchBase(
        @Args('baseID') baseID: string, //
    ): Promise<BaseEntity> {
        return this.baseService.findOne(baseID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/base
     * @param createBaseInput
     * @response 생성된 정보
     */
    @Mutation(
        () => BaseEntity, //
        { description: `${BaseResolver.NAME} 생성` },
    )
    createBase(
        @Args('createBaseInput') createBaseInput: CreateBaseInput,
    ): Promise<BaseEntity> {
        return this.baseService.create(createBaseInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/base/:id
     * @param baseID
     * @param updateBaseInput
     * @response 수정된 정보
     */
    @Mutation(
        () => BaseEntity, //
        { description: `${BaseResolver.NAME} 수정` },
    )
    updateBase(
        @Args('baseID') baseID: string, //
        @Args('updateBaseInput') updateBaseInput: UpdateBaseInput,
    ): Promise<BaseEntity> {
        return this.baseService.update(baseID, updateBaseInput);
    }

    /**
     * PUT /api/base/:id
     * @param baseID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: `${BaseResolver.NAME} 삭제 취소` },
    )
    restoreBase(
        @Args('baseID') baseID: string, //
    ): Promise<ResultMessage> {
        return this.baseService.restore(baseID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/base/:id
     * @param baseID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: `${BaseResolver.NAME} 삭제 ( Real )` },
    )
    deleteBase(
        @Args('baseID') baseID: string, //
    ): Promise<ResultMessage> {
        return this.baseService.delete(baseID);
    }

    /**
     * DELETE /api/base/:id
     * @param baseID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: `${BaseResolver.NAME} 삭제 ( Soft )` },
    )
    softDeleteBase(
        @Args('baseID') baseID: string, //
    ): Promise<ResultMessage> {
        return this.baseService.softDelete(baseID);
    }
}
