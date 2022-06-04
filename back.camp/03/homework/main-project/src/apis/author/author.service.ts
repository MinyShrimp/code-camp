import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import AuthorEntity from './entities/author.entity';
import CreateAuthorInput from './dto/createAuthor.input';
import UpdateAuthorInput from './dto/updateAuthor.input';

@Injectable()
export default class AuthorService {
    constructor(
        @InjectRepository(AuthorEntity)
        private readonly authorRepository: Repository<AuthorEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 조회
     * @returns 조회된 저자 목록
     */
    private async __findAll(): Promise<AuthorEntity[]> {
        return await this.authorRepository.find({});
    }

    /**
     * 단일 조회
     * @param authorID
     * @returns 조회된 저자 정보
     */
    async findOne(
        authorID: string, //
    ): Promise<AuthorEntity> {
        return await this.authorRepository.findOne({
            where: { id: authorID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 저자 생성
     * @param createAuthorInput
     * @returns 생성된 저자 정보
     */
    async create(
        createAuthorInput: CreateAuthorInput, //
    ): Promise<AuthorEntity> {
        const input = createAuthorInput;

        return await this.authorRepository.save({
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 저자 정보 수정
     * @param authorID
     * @param updateAuthorInput
     * @returns 수정된 저자 정보
     */
    async update(
        authorID: string, //
        updateAuthorInput: UpdateAuthorInput,
    ): Promise<AuthorEntity> {
        const input = updateAuthorInput;
        const author = await this.findOne(authorID);

        return await this.authorRepository.save({
            ...author,
            ...input,
        });
    }

    /**
     * 저자 정보 삭제 취소
     * @param authorID
     * @returns ResultMessage
     */
    async restore(
        authorID: string, //
    ): Promise<ResultMessage> {
        const result = await this.authorRepository.restore({
            id: authorID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: authorID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Restore Author'
                : 'Failed Restore Author',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 저자 삭제 ( 삭제 O )
     * @param authorID
     * @returns ResultMessage
     */
    async delete(
        authorID: string, //
    ): Promise<ResultMessage> {
        const result = await this.authorRepository.delete({
            id: authorID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: authorID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Delete Author'
                : 'Failed Delete Author',
        });
    }

    /**
     * 저자 정보 삭제 ( 삭제 X )
     * @param authorID
     * @returns ResultMessage
     */
    async softDelete(
        authorID: string, //
    ): Promise<ResultMessage> {
        const result = await this.authorRepository.softDelete({
            id: authorID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: authorID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Soft Delete Author'
                : 'Failed Soft Delete Author',
        });
    }
}
