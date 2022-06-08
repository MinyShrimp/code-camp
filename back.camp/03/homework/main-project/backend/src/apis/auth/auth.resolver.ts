import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { IPayload } from '../../commons/interfaces/Payload.interface';
import { CurrentUser } from '../../commons/auth/gql-user.param';
import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { GqlAuthJwtGuard } from '../../commons/auth/gql-auth.guard';

import { UserEntity } from '../user/entities/user.entity';
import { UserCheckService } from '../user/userCheck.service';

import { LoginInput } from './dto/Login.input';
import { SignupInput } from './dto/Signup.input';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

/* Auth API */
@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
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
        // 검색
        const user = await this.userService.findOneByEmail(input.email);

        // 이메일 중복 체크
        await this.userCheckService.checkOverlapEmail(user);

        // 회원가입
        return this.authService.Signup(input);
    }

    /**
     * POST /api/retore/token
     * @param currentUser
     * @response JWT Access Token
     */
    @UseGuards(GqlAuthJwtGuard)
    @Mutation(() => String, { description: 'AccessToken 재발급' })
    async restoreToken(
        @CurrentUser() currentUser: IPayload, //
    ) {
        const user = await this.userService.findOneByID(currentUser.id);
        await this.userCheckService.checkValidUser(user);
        return this.authService.getAccessToken(user);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/user/pwd
     * @param pwd
     * @response ResultMessage
     */
    @UseGuards(GqlAuthJwtGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '비밀번호 변경, Bearer JWT' },
    )
    async updateUserPwd(
        @CurrentUser() currentUser: IPayload, //
        @Args('pwd') pwd: string,
    ): Promise<ResultMessage> {
        const userID = currentUser.id;

        // 검색
        const user = await this.userService.findOneByID(userID);

        // 존재 여부 검사
        await this.userCheckService.checkValidUser(user);

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
        @Context() context: any,
        @Args('loginInput') input: LoginInput, //
    ): Promise<string> {
        // 검색
        const user = await this.userService.findOneByEmail(input.email);

        // 이메일 검사
        await this.userCheckService.checkValidUser(user);

        // 로그인 여부 검사
        await this.userCheckService.checkLogin(user);

        // Set Refresh Token
        this.authService.setRefreshToken(user, context.res);

        // 로그인
        return this.authService.Login(user, input);
    }

    /**
     * POST /api/logout
     * - Bearer JWT
     * @response ResultMessage
     */
    @UseGuards(GqlAuthJwtGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '로그아웃, Bearer JWT' },
    )
    async Logout(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<ResultMessage> {
        const userID = currentUser.id;

        // 검색
        const user = await this.userService.findOneByID(userID);

        // 존재 여부 검사
        await this.userCheckService.checkValidUser(user);

        // 로그아웃 여부 검사
        await this.userCheckService.checkLogout(user);

        // 로그아웃
        return this.authService.Logout(userID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
