import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { IPayload, IPayloadSub } from '../interfaces/Payload.interface';

/**
 * GQL Auth Guard => JwtAccessStrategy => GQL User Param
 */
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwtRefreshGuard',
) {
    constructor() {
        super({
            jwtFromRequest: (req: Request) => {
                const cookies = req.headers.cookie.split('; ');
                const refreshToken = cookies
                    .map((c) => c.split('='))
                    .filter((c) => c[0] === 'refreshToken')[0][1];
                return refreshToken;
            },
            secretOrKey: process.env.JWT_REFRESH_KEY,
        });
    }

    /* 검증 성공 시 실행 */
    validate(payload: IPayloadSub): IPayload {
        /* req.user */
        return {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
        };
    }
}
