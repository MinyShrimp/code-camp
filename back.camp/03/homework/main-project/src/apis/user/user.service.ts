import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import SignupInput from './dto/Signup.input';
import UserEntity from './entities/user.entity';
import LoginInput from './dto/Login.input';

@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    /**
     * 가입된 회원 여부 검사
     * @param userID
     * @returns
     */
    private async __checkValidUserByID(
        userID: string, //
    ): Promise<UserEntity> {
        const user = await this.__findOneByID(userID);
        if (user === undefined) {
            throw new UnprocessableEntityException(
                '존재하지 않는 유저입니다.', //
            );
        }
        return user;
    }

    /**
     * 로그인 여부 검사
     * @param user
     * @returns
     */
    private async __checkLogin(
        user: UserEntity, //
    ): Promise<UserEntity> {
        if (user.isLogin) {
            throw new UnprocessableEntityException(
                '이미 로그인된 유저입니다.', //
            );
        }
        return user;
    }

    /**
     * 로그아웃 여부 검사
     * @param user
     * @returns
     */
    private async __checkLogout(
        user: UserEntity, //
    ): Promise<UserEntity> {
        if (!user.isLogin) {
            throw new UnprocessableEntityException(
                '이미 로그아웃된 유저입니다.', //
            );
        }
        return user;
    }

    /**
     * 이메일 중복 검사
     * @param email
     * @returns
     */
    private async __checkOverlapEmail(
        email: string, //
    ): Promise<boolean> {
        const user = await this.__findOneByEmail(email);
        if (user !== undefined) {
            throw new UnprocessableEntityException(
                '이미 존재하는 이메일입니다.', //
            );
        }
        return true;
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 이메일 기반 조회
     * @param email
     * @returns 조회된 회원 정보
     */
    private async __findOneByEmail(
        email: string, //
    ): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { email: email },
        });
    }

    /**
     * ID 기반 조회
     * @param userID
     * @returns 조회된 회원 정보
     */
    private async __findOneByID(
        userID: string, //
    ): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { id: userID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 회원가입
     * @param signupInput
     * @returns 생성된 유저 정보
     *
     * 이메일 중복 검사
     */
    async Signup(
        signupInput: SignupInput, //
    ): Promise<UserEntity> {
        const input = signupInput;

        // 이메일 중복 체크
        await this.__checkOverlapEmail(input.email);

        return await this.userRepository.save({
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 로그인
     * @param loginInput
     * @returns ResultMessage
     *
     * 이메일, 패스워드 검사
     * 로그인 여부 검사
     * 로그인 성공 시, loginAt, isLogin Update
     */
    async Login(
        loginInput: LoginInput, //
    ): Promise<ResultMessage> {
        const input = loginInput;

        // 이메일, 패스워드 검사
        const user = await this.userRepository.findOne({
            where: {
                email: input.email, //
                pwd: input.pwd,
            },
        });

        // 로그인 여부 검사
        await this.__checkLogin(user);

        // 로그인 성공
        await this.userRepository.update(
            { id: user.id },
            { loginAt: new Date(), isLogin: true },
        );

        // 메세지 반환
        return new ResultMessage({
            id: user.id,
            isSuccess: true,
            contents: 'Completed Login',
        });
    }

    /**
     * 로그아웃
     * @param userID
     * @returns ResultMessage
     */
    async Logout(
        userID: string, //
    ): Promise<ResultMessage> {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        });

        // 로그아웃 여부 검사
        await this.__checkLogout(user);

        // 로그아웃 성공
        await this.userRepository.update(
            { id: user.id },
            { logoutAt: new Date(), isLogin: false },
        );

        // 메세지 반환
        return new ResultMessage({
            id: userID,
            isSuccess: true,
            contents: 'Completed Logout',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 회원 삭제 ( 삭제 O )
     * @param userID
     * @returns Result Message
     */
    private async __delete(
        userID: string, //
    ): Promise<ResultMessage> {
        const result = await this.userRepository.delete({
            id: userID,
        });

        return new ResultMessage({
            id: userID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? `Completed User Delete`
                : `Failed User Delete`,
        });
    }

    /**
     * 회원 삭제 ( 삭제 X )
     * @param userID
     * @returns Result Message
     */
    async softDelete(
        userID: string, //
    ): Promise<ResultMessage> {
        const result = await this.userRepository.softDelete({
            id: userID,
        });

        return new ResultMessage({
            id: userID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? `Completed User Delete`
                : `Failed User Delete`,
        });
    }
}
