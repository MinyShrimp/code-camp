import { UseGuards, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';

import { IPayload } from '../../commons/interfaces/Payload.interface';
import { CurrentUser } from '../../commons/auth/gql-user.param';
import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import {
    GqlJwtAccessGuard,
    GqlJwtRefreshGuard,
} from '../../commons/auth/gql-auth.guard';

import { LoginInput } from './dto/Login.input';

import { AuthService } from './auth.service';

/* Auth API */
@Resolver()
export class AuthResolver {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManage: Cache,
        private readonly authService: AuthService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/retore/token
     * @param currentUser
     * @response JWT Access Token
     */
    @UseGuards(GqlJwtRefreshGuard)
    @Mutation(
        () => String, //
        { description: 'AccessToken 재발급' },
    )
    async restoreToken(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<string> {
        const token = await this.authService.restoreToken(currentUser.id);

        // Redis 저장
        await this.cacheManage.set(
            `blacklist:${currentUser.id}:access_token`,
            currentUser.access_token,
            { ttl: 3600 },
        );

        return token;
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * POST /api/login
     * @param input
     * @response AccessToken
     */
    @Mutation(
        () => String, //
        { description: '로그인, Get AccessToken' },
    )
    async Login(
        @Context() context: any,
        @Args('loginInput') input: LoginInput, //
    ): Promise<string> {
        // 로그인
        return this.authService.Login(context, input);
    }

    /**
     * POST /api/logout
     * - Bearer JWT
     * @response ResultMessage
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '로그아웃, Bearer JWT' },
    )
    async Logout(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<ResultMessage> {
        // 로그아웃
        const result = this.authService.Logout(currentUser.id);

        // Redis 저장
        await this.cacheManage.set(
            `blacklist:${currentUser.id}:access_token`,
            currentUser.access_token,
            { ttl: currentUser.access_exp },
        );
        await this.cacheManage.set(
            `blacklist:${currentUser.id}:refresh_token`,
            currentUser.refresh_token,
            { ttl: currentUser.refresh_exp },
        );

        return result;
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
