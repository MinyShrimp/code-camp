import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';

import { DateUtil } from 'src/commons/utils/date.util';
import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

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
    private createPassword(
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
    private comparePassword(
        originPwd: string, //
        hashPwd: string,
    ): boolean {
        if (!bcrypt.compareSync(originPwd, hashPwd)) {
            throw new ConflictException('비밀번호가 다릅니다.');
        }
        return true;
    }

    /**
     * JWT 생성
     * @param user
     * @returns Access Token
     */
    private async getAccessToken(
        user: UserEntity, //
    ): Promise<string> {
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
            },
        );
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
