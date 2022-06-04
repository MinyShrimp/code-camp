import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import AuthorEntity from './entities/author.entity';
import CreateAuthorInput from './dto/createAuthor.input';
import UpdateAuthorInput from './dto/updateAuthor.input';

import AuthorService from './author.service';

@Resolver()
export default class AuthorResolver {
    constructor(
        private readonly authorService: AuthorService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    // GET 단일 저자 정보
    @Query(() => AuthorEntity)
    fetchAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<AuthorEntity> {
        return this.authorService.findOne(authorID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    // POST 저자 생성
    @Mutation(() => AuthorEntity)
    createAuthor(
        @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
    ): Promise<AuthorEntity> {
        return this.authorService.create(createAuthorInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    // FATCH 저자 정보 수정
    @Mutation(() => AuthorEntity)
    updateAuthor(
        @Args('authorID') authorID: string,
        @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
    ): Promise<AuthorEntity> {
        return this.authorService.update(authorID, updateAuthorInput);
    }

    // POST 저자 삭제 취소
    @Mutation(() => ResultMessage)
    restoreAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<ResultMessage> {
        return this.authorService.restore(authorID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    // DELETE 저자 삭제 ( 삭제 O )
    @Mutation(() => ResultMessage)
    deleteAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<ResultMessage> {
        return this.authorService.delete(authorID);
    }

    // DELETE 저자 삭제 ( 삭제 X )
    @Mutation(() => ResultMessage)
    softDeleteAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<ResultMessage> {
        return this.authorService.softDelete(authorID);
    }
}
