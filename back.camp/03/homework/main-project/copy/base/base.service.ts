import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import { BaseEntity } from './entities/base.entity';
import { CreateBaseInput } from './dto/createBase.input';
import { UpdateBaseInput } from './dto/updateBase.input';

@Injectable()
export class BaseService {
    constructor(
        @InjectRepository(BaseEntity)
        private readonly baseRepository: Repository<BaseEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 조회
     * @returns 조회된 정보 목록
     */
    async findAll(): Promise<BaseEntity[]> {
        return await this.baseRepository.find({});
    }

    /**
     * 단일 조회
     * @param baseID
     * @returns 조회된 정보
     */
    async findOne(
        baseID: string, //
    ): Promise<BaseEntity> {
        return await this.baseRepository.findOne({
            where: { id: baseID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 생성
     * @param createBaseInput
     * @returns 생성된 정보
     */
    async create(
        createBaseInput: CreateBaseInput, //
    ): Promise<BaseEntity> {
        const { ...input } = createBaseInput;

        return await this.baseRepository.save({
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 수정
     * @param baseID
     * @param updateBaseInput
     * @returns 수정된 정보
     */
    async update(
        baseID: string, //
        updateBaseInput: UpdateBaseInput,
    ): Promise<BaseEntity> {
        const { ...input } = updateBaseInput;

        const base = await this.findOne(baseID);

        return await this.baseRepository.save({
            ...base,
            ...input,
        });
    }

    /**
     * 삭제 취소
     * @param baseID
     * @returns ResultMessage
     */
    async restore(
        baseID: string, //
    ): Promise<ResultMessage> {
        const result = await this.baseRepository.restore({
            id: baseID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: baseID,
            isSuccess,
            contents: isSuccess
                ? `Completed Base Restore`
                : `Failed Base Restore`,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 삭제 ( Real )
     * @param baseID
     * @returns ResultMessage
     */
    async delete(
        baseID: string, //
    ): Promise<ResultMessage> {
        const result = await this.baseRepository.delete({
            id: baseID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: baseID,
            isSuccess,
            contents: isSuccess
                ? `Completed Base Delete`
                : `Failed Base Delete`,
        });
    }

    /**
     * 삭제 ( Soft )
     * @param baseID
     * @returns ResultMessage
     */
    async softDelete(
        baseID: string, //
    ): Promise<ResultMessage> {
        const result = await this.baseRepository.softDelete({
            id: baseID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: baseID,
            isSuccess,
            contents: isSuccess
                ? `Completed Base Soft Delete`
                : `Failed Base Soft Delete`,
        });
    }
}
