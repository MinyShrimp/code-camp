import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserCheckService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 기본 조회 //

    /**
     * ID 기반 회원 조회
     * @param userID
     * @returns 회원 정보
     */
    async findOneByID(
        userID: string, //
    ): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { id: userID },
        });
    }

    /**
     * Email 기반 회원 조회
     * @param email
     * @returns 회원 정보
     */
    async findOneByEmail(
        email: string, //
    ): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { email: email },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 회원 정보 새로 검색 //

    /**
     * 가입된 회원 여부 검사
     * @param userID
     * @returns 회원 정보
     * 존재하지 않으면 ConflictException
     */
    async checkValidUser(
        userID: string, //
    ): Promise<UserEntity> {
        const user = await this.findOneByID(userID);
        if (user === undefined) {
            throw new ConflictException(
                '존재하지 않는 유저입니다.', //
            );
        }
        return user;
    }

    /**
     * 가입된 회원 여부 검사
     * @param email
     * @returns 회원 정보
     * 존재하지 않으면 ConflictException
     */
    async checkValidUserByEmail(
        email: string, //
    ): Promise<UserEntity> {
        const user = await this.findOneByEmail(email);
        if (user === undefined) {
            throw new ConflictException(
                '존재하지 않는 유저입니다.', //
            );
        }
        return user;
    }

    /**
     * 이메일 중복 검사
     * @param email
     * @returns 회원 정보
     * 존재하면 ConflictException
     */
    async checkOverlapEmail(
        email: string, //
    ): Promise<UserEntity> {
        const user = await this.findOneByEmail(email);
        if (user !== undefined) {
            throw new ConflictException(
                '이미 존재하는 이메일입니다.', //
            );
        }
        return user;
    }

    ///////////////////////////////////////////////////////////////////
    // 값 검사 //

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

    /**
     * 비밀번호 검사
     * @param user
     * @param pwd
     * @returns 회원 정보
     */
    checkPassword(
        user: UserEntity, //
        pwd: string,
    ): UserEntity {
        if (user.pwd !== pwd) {
            throw new ConflictException(
                '비밀번호가 다릅니다.', //
            );
        }
        return user;
    }
}
