import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DateUtil } from '../../commons/utils/date.util';
import { ResultMessage } from '../../commons/dto/ResultMessage.dto';

import { SignupInput } from './dto/Signup.input';
import { LoginInput } from './dto/Login.input';
import { UpdateUserInput } from './dto/updateUser.input';

import { UserEntity } from './entities/user.entity';
import { UserCheckService } from './userCheck.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userCheckService: UserCheckService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * ID 기반 회원 조회
     * @param userID
     * @returns 회원 정보
     */
    async findOneByID(
        userID: string, //
    ): Promise<UserEntity> {
        return await this.userCheckService.findOneByID(userID);
    }

    /**
     * Email 기반 회원 조회
     * @param email
     * @returns 회원 정보
     */
    async findOneByEmail(
        email: string, //
    ): Promise<UserEntity> {
        return await this.userCheckService.findOneByEmail(email);
    }

    /**
     * 전체 조회
     * @returns 조회된 회원 정보 목록
     */
    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({});
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
        const { ...input } = signupInput;

        // 이메일 중복 체크
        await this.userCheckService.checkOverlapEmail(input.email);

        return await this.userRepository.save({
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 회원 정보 수정
     * @param userID
     * @param updateInput
     * @returns 수정된 회원 정보
     */
    async update(
        userID: string, //
        updateInput: UpdateUserInput,
    ): Promise<UserEntity> {
        const { ...input } = updateInput;

        // 존재 여부 확인
        const user = await this.userCheckService.checkValidUser(userID);

        return await this.userRepository.save({
            ...user,
            ...input,
        });
    }

    /**
     * 로그인
     * @param loginInput
     * @returns 로그인된 회원 정보
     *
     * 이메일, 패스워드 검사
     * 로그인 여부 검사
     * 로그인 성공 시, loginAt, isLogin Update
     */
    async Login(
        loginInput: LoginInput, //
    ): Promise<UserEntity> {
        const { ...input } = loginInput;

        // 이메일 검사
        const user = await this.userCheckService.checkValidUserByEmail(
            input.email,
        );

        // 비밀번호 검사
        this.userCheckService.checkPassword(user, input.pwd);

        // 로그인 여부 검사
        await this.userCheckService.checkLogin(user);

        // 로그인 성공
        return await this.userRepository.save({
            ...user,
            loginAt: DateUtil.getKorDateNow(),
            isLogin: true,
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
        // 존재 여부 검사
        const user = await this.userCheckService.checkValidUser(userID);

        // 로그아웃 여부 검사
        await this.userCheckService.checkLogout(user);

        // 로그아웃 성공
        await this.userRepository.update(
            { id: user.id },
            { logoutAt: DateUtil.getKorDateNow(), isLogin: false },
        );

        // 메세지 반환
        return new ResultMessage({
            id: userID,
            isSuccess: true,
            contents: 'Completed Logout',
        });
    }

    /**
     * 회원 탈퇴 취소
     * @param userID
     * @returns ResultMessage
     */
    async restore(
        userID: string, //
    ): Promise<ResultMessage> {
        const result = await this.userRepository.restore({
            id: userID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: userID,
            isSuccess,
            contents: isSuccess
                ? 'Completed User Restore'
                : 'Failed User Restore',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 회원 삭제 ( 삭제 O )
     * @param userID
     * @returns ResultMessage
     */
    async delete(
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
     * @returns ResultMessage
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
