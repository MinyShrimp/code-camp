import { Response } from 'express';
import { randomUUID } from 'crypto';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IUser } from '../../commons/interfaces/User.interface';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

interface IOAuthRequest extends Request {
    user: IUser;
}

@Controller()
export class AuthController {
    private readonly REDIRECT =
        'http://localhost:5500/frontend/login/index.html';

    constructor(
        private readonly authService: AuthService, //
        private readonly userService: UserService,
    ) {}

    /**
     * OAuth Login Process
     * @param userInfo
     * @param res
     */
    private async OAuthLogin(
        userInfo: IUser, //
        res: Response,
    ): Promise<void> {
        // 1. 가입 확인
        let user = await this.userService.findOneByEmail(userInfo.email);

        // 1-1. 이미 가입되어 있으면 통과
        // 1-2. 가입이 안되어 있으면 회원가입
        if (!user) {
            user = await this.userService.createUser({
                email: userInfo.email,
                name: userInfo.name,
                pwd: randomUUID(), // DB에 저장하는 비밀번호를 랜덤한 uuid로 저장한다
            });
        }

        // 2. 로그인
        this.authService.setRefreshToken(user, res);
    }

    /**
     * OAuth: Google
     * @param req
     * @param res
     */
    @Get('/login/google')
    @UseGuards(AuthGuard('google'))
    async LoginGoogle(
        @Req() req: IOAuthRequest, //
        @Res() res: Response,
    ): Promise<void> {
        // 1. 가입 확인
        // 1-1. 이미 가입되어 있으면 통과
        // 1-2. 가입이 안되어 있으면 회원가입
        // 2. 로그인
        await this.OAuthLogin(req.user, res);

        // 3. Redirect
        res.redirect(this.REDIRECT);
    }

    /**
     * OAuth: Kakao
     * @param req
     * @param res
     */
    @Get('/login/kakao')
    @UseGuards(AuthGuard('kakao'))
    async LoginKakao(
        @Req() req: IOAuthRequest, //
        @Res() res: Response,
    ): Promise<void> {
        // 1. 가입 확인
        // 1-1. 이미 가입되어 있으면 통과
        // 1-2. 가입이 안되어 있으면 회원가입
        // 2. 로그인
        await this.OAuthLogin(req.user, res);

        // 3. Redirect
        res.redirect(this.REDIRECT);
    }

    /**
     * OAuth: Naver
     * @param req
     * @param res
     */
    @Get('/login/naver')
    @UseGuards(AuthGuard('naver'))
    async LoginNaver(
        @Req() req: IOAuthRequest, //
        @Res() res: Response,
    ): Promise<void> {
        // 1. 가입 확인
        // 1-1. 이미 가입되어 있으면 통과
        // 1-2. 가입이 안되어 있으면 회원가입
        // 2. 로그인
        await this.OAuthLogin(req.user, res);

        // 3. Redirect
        res.redirect(this.REDIRECT);
    }
}
