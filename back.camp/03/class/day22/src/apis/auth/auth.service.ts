import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import UserEntity from "../users/entities/user.entity";

@Injectable()
export default class AuthService {
    constructor(
        private readonly jwtService: JwtService //
    ) {}

    async getAccessToken(
        user: UserEntity //
    ): Promise<string> {
        console.log(process.env.JWT_ACCESS_KEY);

        // JWT 서명
        return this.jwtService.sign(
            {
                /* Payloads */
                sub: user.id,
                name: user.name,
                email: user.email,
            },
            {
                /* Options */
                secret: process.env.JWT_ACCESS_KEY,
            }
        );
    }
}
