import { NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IPayload, IPayloadSub } from '../interfaces/Payload.interface';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { MESSAGES } from '../message/Message.enum';

export class JwtAdminStrategy extends PassportStrategy(
    JwtAccessStrategy,
    'jwtAdminGuard',
) {
    constructor() {
        super();
    }

    validate(payload: IPayloadSub): IPayload {
        if (payload.email !== process.env.ADMIN_EMAIL) {
            throw new NotFoundException(MESSAGES.UNVLIAD_ACCESS);
        }

        return super.validate(payload);
    }
}
