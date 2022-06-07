import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserCheckService {
    constructor() {}

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
                '존재하지 않는 유저입니다.', //
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
                '이미 존재하는 이메일입니다.', //
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
                '이미 로그인된 유저입니다.', //
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
                '이미 로그아웃된 유저입니다.', //
            );
        }
        return user;
    }
}