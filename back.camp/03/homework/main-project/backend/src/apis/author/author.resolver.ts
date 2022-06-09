import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';

import { AuthorEntity } from './entities/author.entity';
import { CreateAuthorInput } from './dto/createAuthor.input';
import { UpdateAuthorInput } from './dto/updateAuthor.input';
import { AuthorService } from './author.service';

/* 저자 API */
@Resolver()
export class AuthorResolver {
    constructor(
        private readonly authorService: AuthorService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/author/:id
     * @param authorID
     * @response 조회된 저자 정보
     */
    @Query(
        () => AuthorEntity, //
        { description: '저자 정보 단일 조회' },
    )
    fetchAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<AuthorEntity> {
        return this.authorService.findOne(authorID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/author
     * @param createAuthorInput
     * @response 생성된 저자 정보
     */
    @Mutation(
        () => AuthorEntity, //
        { description: '저자 정보 생성' },
    )
    createAuthor(
        @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
    ): Promise<AuthorEntity> {
        return this.authorService.create(createAuthorInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/author/:id
     * @param authorID
     * @param updateAuthorInput
     * @response 수정된 저자 정보
     */
    @Mutation(
        () => AuthorEntity, //
        { description: '저자 정보 수정' },
    )
    updateAuthor(
        @Args('authorID') authorID: string,
        @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
    ): Promise<AuthorEntity> {
        return this.authorService.update(authorID, updateAuthorInput);
    }

    /**
     * PUT /api/author/:id
     * @param authorID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '저자 정보 삭제 취소' },
    )
    restoreAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<ResultMessage> {
        return this.authorService.restore(authorID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/author/:id
     * @param authorID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '저자 정보 삭제 ( Real )' },
    )
    deleteAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<ResultMessage> {
        return this.authorService.delete(authorID);
    }

    /**
     * DELETE /api/author/:id
     * @param authorID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '저자 정보 삭제 ( Soft )' },
    )
    softDeleteAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<ResultMessage> {
        return this.authorService.softDelete(authorID);
    }
}
