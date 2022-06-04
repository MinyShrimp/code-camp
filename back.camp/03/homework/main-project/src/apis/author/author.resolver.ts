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

    @Query(() => AuthorEntity)
    fetchAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<AuthorEntity> {
        return this.authorService.findOne(authorID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    @Mutation(() => AuthorEntity)
    createAuthor(
        @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
    ): Promise<AuthorEntity> {
        return this.authorService.create(createAuthorInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    @Mutation(() => AuthorEntity)
    updateAuthor(
        @Args('authorID') authorID: string,
        @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
    ): Promise<AuthorEntity> {
        return this.authorService.update(authorID, updateAuthorInput);
    }

    @Mutation(() => ResultMessage)
    restoreAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<ResultMessage> {
        return this.authorService.restore(authorID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    @Mutation(() => ResultMessage)
    deleteAuthor(
        @Args('authorID') authorID: string, //
    ): Promise<ResultMessage> {
        return this.authorService.softDelete(authorID);
    }
}
