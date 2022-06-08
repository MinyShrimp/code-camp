import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';

import { IPayloadSub } from '../../commons/interfaces/Payload.interface';
import { DateUtil } from '../../commons/utils/date.util';
import { ResultMessage } from '../../commons/dto/ResultMessage.dto';

import { UserEntity } from '../user/entities/user.entity';

import { LoginInput } from './dto/Login.input';
import { SignupInput } from './dto/Signup.input';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    /**
     * Hash 비밀번호 생성
     * @param originPwd
     * @returns Hasing Password
     */
    createPassword(
        originPwd: string, //
    ): string {
        return bcrypt.hashSync(originPwd, bcrypt.genSaltSync());
    }

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
            throw new ConflictException('비밀번호가 다릅니다.');
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
        return {
            sub: user.id,
            name: user.name,
            email: user.email,
        };
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
    ): void {
        const payload = this.getPayload(user);

        const refreshToken = this.jwtService.sign(payload, {
            /* Options */
            secret: process.env.JWT_REFRESH_KEY,
            expiresIn: '2w',
        });

        // 개발 환경
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);

        // 배포 환경
        // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
        // res.setHeader(
        //   'Set-Cookie',
        //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
        // )
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 회원가입
     * @param input
     * @returns 생성된 유저 정보
     *
     * 이메일 중복 검사
     */
    async Signup(
        input: SignupInput, //
    ): Promise<UserEntity> {
        // 비밀번호 해싱
        return await this.userRepository.save({
            ...input,
            pwd: this.createPassword(input.pwd),
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 비밀번호 변경
     * @param userID
     * @param pwd
     * @returns ResultMessage
     */
    async updatePwd(
        userID: string, //
        pwd: string,
    ): Promise<ResultMessage> {
        // 비밀번호 변경
        // + 로그아웃
        const result = await this.userRepository.update(
            { id: userID },
            {
                pwd: this.createPassword(pwd),
                logoutAt: DateUtil.getKorDateNow(),
                isLogin: false,
            },
        );
        const isSuccess = result.affected ? true : false;

        // 메세지 반환
        return new ResultMessage({
            id: userID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Change Password'
                : 'Failed Change Password',
        });
    }

    /**
     * 로그인
     * @param user
     * @param input
     * @returns J.W.T
     *
     * 이메일, 패스워드 검사
     * 로그인 여부 검사
     * 로그인 성공 시, loginAt, isLogin Update
     */
    async Login(
        user: UserEntity,
        input: LoginInput, //
    ): Promise<string> {
        // 비밀번호 검사
        this.comparePassword(input.pwd, user.pwd);

        // 로그인 성공
        await this.userRepository.save({
            ...user,
            loginAt: DateUtil.getKorDateNow(),
            isLogin: true,
        });

        return this.getAccessToken(user);
    }

    /**
     * 로그아웃
     * @param userID
     * @returns ResultMessage
     */
    async Logout(
        userID: string, //
    ): Promise<ResultMessage> {
        // 로그아웃 시도
        const result = await this.userRepository.update(
            { id: userID },
            {
                logoutAt: DateUtil.getKorDateNow(),
                isLogin: false,
            },
        );
        const isSuccess = result.affected ? true : false;

        // 메세지 반환
        return new ResultMessage({
            id: userID,
            isSuccess,
            contents: isSuccess ? 'Completed Logout' : 'Failed Logout',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
