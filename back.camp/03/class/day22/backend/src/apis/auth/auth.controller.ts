import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import UserEntity from "../users/entities/user.entity";
import UserService from "../users/users.service";
import AuthService from "./auth.service";

interface IOAuthUser {
    user: Pick<UserEntity, "email" | "pwd" | "name" | "age">;
}

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    /**
     * OAuth: Google
     */
    @Get("/login/google")
    @UseGuards(AuthGuard("google"))
    async LoginGoogle(
        @Req() req: Request & IOAuthUser, //
        @Res() res: Response
    ) {
        // 1. 가입 확인
        let user = await this.userService.findOneByEmail(req.user.email);

        // 1-1. 이미 가입되어있으면 통과
        // 1-2. 가입이 안되어있으면 회원가입
        if (!user) {
            user = await this.userService.create({
                email: req.user.email,
                name: req.user.name,
                age: 0,
                pwd: this.userService.createPassword("oauth"),
            });
        }

        // 2. 로그인
        this.authService.setRefreshToken(user, res);

        // 3. Redirect
        res.redirect("http://localhost:5500/back.camp/03/class/day22/frontend/social-login.html");
    }
}
