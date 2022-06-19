import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { decode } from 'jsonwebtoken';

import { IPayload, IPayloadSub } from '../interfaces/Payload.interface';
import { getRefreshTokenInCookie } from './getRefreshTokenInCookie';

/**
 * GQL Auth Guard => JwtAccessStrategy => GQL User Param
 */
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwtRefreshGuard',
) {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {
        super({
            jwtFromRequest: getRefreshTokenInCookie,
            secretOrKey: process.env.JWT_REFRESH_KEY,
            passReqToCallback: true,
        });
    }

    /* 검증 성공 시 실행 */
    async validate(
        req: Request, //
        payload: IPayloadSub,
    ): Promise<IPayload> {
        const access_token = req.headers.authorization.split(' ')[1];
        const refresh_token = getRefreshTokenInCookie(req);

        if (!refresh_token || !access_token) {
            throw new UnauthorizedException();
        }

        const access_jwt = decode(access_token) as IPayloadSub;

        const refresh_cache = await this.cacheManager.get(
            `blacklist:refresh_token:${refresh_token}`,
        );

        if (refresh_cache) {
            throw new UnauthorizedException();
        }

        /* req.user */
        return {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            isAdmin: payload.isAdmin ?? false,
            access_exp: access_jwt.exp - access_jwt.iat,
            access_token: access_token,
            refresh_exp: payload.exp - payload.iat,
            refresh_token: refresh_token,
        };
    }
}
