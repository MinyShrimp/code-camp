import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { PayloadDto } from 'src/commons/dto/payload.dto';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

import { UserEntity } from '../user/entities/user.entity';
import { UserCheckService } from '../user/userCheck.service';

import { LoginInput } from './dto/Login.input';
import { SignupInput } from './dto/Signup.input';

import { AuthService } from './auth.service';

/* Auth API */
@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userCheckService: UserCheckService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/signup
     * @param input
     * @response 생성된 회원 정보
     */
    @Mutation(
        () => UserEntity, //
        { description: '회원가입' },
    )
    async createUser(
        @Args('signupInput') input: SignupInput, //
    ): Promise<UserEntity> {
        // 이메일 중복 체크
        await this.userCheckService.checkOverlapEmail(input.email);

        // 회원가입
        return this.authService.Signup(input);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/user/pwd
     * @param pwd
     * @response ResultMessage
     */
    @UseGuards(GqlAuthAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '비밀번호 변경, Bearer JWT' },
    )
    async updateUserPwd(
        @CurrentUser() currentUser: PayloadDto, //
        @Args('pwd') pwd: string,
    ): Promise<ResultMessage> {
        const userID = currentUser.id;

        // 존재 여부 검사
        await this.userCheckService.checkValidUser(userID);

        // 비밀번호 변경 + 로그아웃
        return this.authService.updatePwd(userID, pwd);
    }

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
        @Args('loginInput') input: LoginInput, //
    ): Promise<string> {
        // 이메일 검사
        const user = await this.userCheckService.checkValidUserByEmail(
            input.email,
        );

        // 로그인 여부 검사
        await this.userCheckService.checkLogin(user);

        // 로그인
        return this.authService.Login(user, input);
    }

    /**
     * POST /api/logout
     * - Bearer JWT
     * @response ResultMessage
     */
    @UseGuards(GqlAuthAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '로그아웃, Bearer JWT' },
    )
    async Logout(
        @CurrentUser() currentUser: PayloadDto, //
    ): Promise<ResultMessage> {
        const userID = currentUser.id;

        // 존재 여부 검사
        const user = await this.userCheckService.checkValidUser(userID);

        // 로그아웃 여부 검사
        await this.userCheckService.checkLogout(user);

        // 로그아웃
        return this.authService.Logout(userID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}