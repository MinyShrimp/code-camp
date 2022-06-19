import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
    ConflictException,
    Injectable,
    CACHE_MANAGER,
    Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { IPayloadSub } from '../../commons/interfaces/Payload.interface';
import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';

import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserCheckService } from '../user/userCheck.service';

import { LoginInput } from './dto/Login.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        private readonly userCheckService: UserCheckService,
        private readonly userSerivce: UserService,
        private readonly jwtService: JwtService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    /**
     * Hash 비밀번호 비교
     * @param originPwd
     * @param hashPwd
     * @returns isCompare
     */
    comparePassword(
        originPwd: string, //
        hashPwd: string,
    ): boolean {
        if (!bcrypt.compareSync(originPwd, hashPwd)) {
            throw new ConflictException(MESSAGES.USER_COMPARE_PWD_FAILED);
        }
        return true;
    }

    /**
     * JWT Payload Data
     * @param user
     * @returns Payload
     */
    private getPayload(
        user: UserEntity, //
    ): IPayloadSub {
        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
        };

        if (user.isAdmin) {
            payload['isAdmin'] = true;
        }

        return payload;
    }

    /**
     * JWT Get Access Token
     * @param user
     * @returns Access Token
     *
     * 만료 기간: 1시간
     */
    getAccessToken(
        user: UserEntity, //
    ): string {
        const payload = this.getPayload(user);
        return this.jwtService.sign(payload, {
            /* Options */
            secret: process.env.JWT_ACCESS_KEY,
            expiresIn: '1h',
        });
    }

    /**
     * JWT Set Refresh Token
     * @param user
     *
     * 만료기간: 2주
     */
    setRefreshToken(
        user: UserEntity, //
        res: Response,
    ): string {
        const payload = this.getPayload(user);

        const refreshToken = this.jwtService.sign(payload, {
            /* Options */
            secret: process.env.JWT_REFRESH_KEY,
            expiresIn: '2w',
        });

        // 개발 환경
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);

        return refreshToken;

        // 배포 환경
        // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
        // res.setHeader(
        //   'Set-Cookie',
        //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
        // )
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * JWT 재발급
     * @param userID
     * @returns AccessToken
     */
    async restoreToken(
        userID: string, //
    ) {
        const user = await this.userSerivce.findOneByID(userID);
        return this.getAccessToken(user);
    }

    ///////////////////////////////////////////////////////////////////
    // 인증 //

    /**
     * 로그인
     * @param context
     * @param input
     * @returns J.W.T
     */
    async Login(
        context: any,
        input: LoginInput, //
    ): Promise<string> {
        // 검색
        const user = await this.userSerivce.findOneByEmail(input.email);

        // 존재 여부 검사
        await this.userCheckService.checkValidUser(user);

        // 로그인 여부 검사 ( MySQL )
        await this.userCheckService.checkLogin(user);

        // Set Refresh Token
        const refresh_token = this.setRefreshToken(user, context.res);

        // 비밀번호 검사
        this.comparePassword(input.pwd, user.pwd);

        // 로그인 성공
        await this.userRepository.save({
            ...user,
            loginAt: new Date().toUTCString(),
            isLogin: true,
        });

        // jwt 생성
        const access_token = this.getAccessToken(user);

        return access_token;
    }

    /**
     * 로그아웃
     * @param userID
     * @returns ResultMessage
     */
    async Logout(
        userID: string, //
    ): Promise<ResultMessage> {
        // 검색
        const user = await this.userSerivce.findOneByID(userID);

        // 존재 여부 검사
        await this.userCheckService.checkValidUser(user);

        // 로그아웃 여부 검사
        await this.userCheckService.checkLogout(user);

        // 로그아웃 시도
        const result = await this.userRepository.update(
            { id: userID },
            {
                logoutAt: new Date().toUTCString(),
                isLogin: false,
            },
        );
        const isSuccess = result.affected ? true : false;

        // 메세지 반환
        return new ResultMessage({
            id: userID,
            isSuccess,
            contents: isSuccess
                ? MESSAGES.USER_LOGOUT_SUCCESSED
                : MESSAGES.USER_LOGOUT_FAILED,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
