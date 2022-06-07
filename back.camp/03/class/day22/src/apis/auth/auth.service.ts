import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import UserEntity from "../users/entities/user.entity";

@Injectable()
export default class AuthService {
    constructor(
        private readonly jwtService: JwtService //
    ) {}

    private getPayload(user: UserEntity) {
        return {
            sub: user.id,
            name: user.name,
            email: user.email,
        };
    }

    /**
     * JWT Refresh Token
     * @param user
     *
     * 만료기간: 2주
     */
    setRefreshToken(
        user: UserEntity, //
        res: Response
    ): void {
        const payload = this.getPayload(user);

        const refreshToken = this.jwtService.sign(payload, {
            /* Options */
            secret: process.env.JWT_REFRESH_KEY,
            expiresIn: "2w",
        });

        // 개발 환경
        res.setHeader("Set-Cookie", `refreshToken=${refreshToken}`);

        // 배포 환경
        // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
        // res.setHeader(
        //   'Set-Cookie',
        //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
        // )
    }

    /**
     * JWT Access Token
     * @param user
     *
     * 만료기간: 1시간
     */
    getAccessToken(
        user: UserEntity //
    ): string {
        const payload = this.getPayload(user);
        return this.signAccessToken(payload);
    }

    signAccessToken(
        payload: any //
    ): string {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_KEY,
            expiresIn: "1h",
        });
    }
}
