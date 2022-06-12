import { NotFoundException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { IPayload, IPayloadSub } from '../interfaces/Payload.interface';
import { MESSAGES } from '../message/Message.enum';

export class JwtAdminStrategy extends PassportStrategy(
    Strategy,
    'jwtAdminGuard',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_KEY,
        });
    }

    /* 검증 성공 시 실행 */
    validate(payload: IPayloadSub): IPayload {
        if (!payload.isAdmin) {
            throw new NotFoundException(MESSAGES.UNVLIAD_ACCESS);
        }

        /* req.user */
        return {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            isAdmin: payload.isAdmin ?? false,
        };
    }
}
