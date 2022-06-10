import {
    ConflictException,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPayload } from 'src/commons/interfaces/Payload.interface';
import { Repository } from 'typeorm';
import { MESSAGES } from '../../commons/message/Message.enum';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserCheckService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 값 검사 //

    /**
     * 가입된 회원 여부 검사
     * @param user
     * @returns 회원 정보
     * 존재하지 않으면 ConflictException
     */
    async checkValidUser(
        user: UserEntity, //
    ): Promise<UserEntity> {
        if (user === undefined) {
            throw new ConflictException(
                MESSAGES.USER_FIND_ONE_FAILED, //
            );
        }
        return user;
    }

    /**
     * 이메일 중복 검사
     * @param user
     * @returns 회원 정보
     * 존재하면 ConflictException
     */
    async checkOverlapEmail(
        user: UserEntity, //
    ): Promise<UserEntity> {
        if (user !== undefined) {
            throw new ConflictException(
                MESSAGES.USER_OVERLAP_EMAIL, //
            );
        }
        return user;
    }

    /**
     * 로그인 여부 검사
     * @param user
     * @returns 회원 정보
     */
    async checkLogin(
        user: UserEntity, //
    ): Promise<UserEntity> {
        if (user.isLogin) {
            throw new ConflictException(
                MESSAGES.USER_ALREADY_LOGIN, //
            );
        }
        return user;
    }

    /**
     * 로그아웃 여부 검사
     * @param user
     * @returns 회원 정보
     */
    async checkLogout(
        user: UserEntity, //
    ): Promise<UserEntity> {
        if (!user.isLogin) {
            throw new ConflictException(
                MESSAGES.USER_ALREADY_LOGOUT, //
            );
        }
        return user;
    }

    /**
     * JWT와 회원정보 비교
     * @param user
     * @param currentUser
     * @returns 회원 정보
     */
    checkPayload(
        user: UserEntity, //
        currentUser: IPayload,
    ): UserEntity {
        if (
            currentUser.name !== user.name ||
            currentUser.email !== user.email ||
            currentUser.id !== user.id
        ) {
            throw new UnprocessableEntityException(
                MESSAGES.UNVLIAD_ACCESS, //
            );
        }
        return user;
    }
}
