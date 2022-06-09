import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';

import { AuthorEntity } from './entities/author.entity';
import { CreateAuthorInput } from './dto/createAuthor.input';
import { UpdateAuthorInput } from './dto/updateAuthor.input';

@Injectable()
export class AuthorService {
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
        const author = await this.authorRepository.findOne({
            where: { id: authorID },
        });
        if (author === undefined) {
            throw new ConflictException(
                MESSAGES.AUTHOR_FIND_ONE_FAILED, //
            );
        }
        return author;
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
                ? MESSAGES.AUTHOR_RESTORE_SUCCESSED
                : MESSAGES.AUTHOR_RESTORE_FAILED,
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
                ? MESSAGES.AUTHOR_DELETE_SUCCESSED
                : MESSAGES.AUTHOR_DELETE_FAILED,
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
                ? MESSAGES.AUTHOR_SOFT_DELETE_SUCCESSED
                : MESSAGES.AUTHOR_SOFT_DELETE_FAILED,
        });
    }
}
