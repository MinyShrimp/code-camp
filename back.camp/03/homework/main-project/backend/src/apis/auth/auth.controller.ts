import { Response } from 'express';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

import { AuthService } from './auth.service';

interface IOAuthUser {
    user: Pick<UserEntity, 'email' | 'name'>;
}

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    /**
     * OAuth: Google
     * @param req
     * @param res
     */
    @Get('/login/google')
    @UseGuards(AuthGuard('google'))
    async LoginGoogle(
        @Req() req: Request & IOAuthUser, //
        @Res() res: Response,
    ) {
        // 1. 가입 확인
        let user = await this.userService.findOneByEmail(req.user.email);

        // 1-1. 이미 가입되어 있으면 통과
        // 1-2. 가입이 안되어 있으면 회원가입
        if (!user) {
            user = await this.authService.Signup({
                email: req.user.email,
                name: req.user.name,
                pwd: 'oauth',
            });
        }

        // 2. 로그인
        this.authService.setRefreshToken(user, res);

        // 3. Redirect
        res.redirect('http://localhost:5500/');
    }
}
