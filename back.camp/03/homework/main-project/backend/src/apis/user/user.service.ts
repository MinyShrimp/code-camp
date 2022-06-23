import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';

import { UpdateUserInput } from './dto/updateUser.input';

import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/createUser.input';
import { UserCheckService } from './userCheck.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>, //
        private readonly userCheckService: UserCheckService,
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

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 조회
     * @returns 조회된 회원 정보 목록
     */
    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({});
    }

    /**
     * 삭제 포함 전체 조회
     * @returns 조회된 회원 정보 목록
     */
    async findAllWithDeleted(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            withDeleted: true,
        });
    }

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
     * 삭제 포함 ID 기반 회원 조회
     * @param userID
     * @returns 회원 정보
     */
    async findOneByIDWithDeleted(
        userID: string, //
    ): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { id: userID },
            withDeleted: true,
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

    /**
     * 삭제포함 Email 기반 회원 조회
     * @param email
     * @returns 회원 정보
     */
    async findOneByEmailWithDeleted(
        email: string, //
    ): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { email: email },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 회원가입
     * @param input
     * @returns 생성된 유저 정보
     *
     * 이메일 중복 검사
     */
    async createUser(
        input: CreateUserInput, //
    ): Promise<UserEntity> {
        // 검색
        const user = await this.findOneByEmail(input.email);

        // 이메일 중복 체크
        this.userCheckService.checkOverlapEmail(user);

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
        // 검색
        await this.findOneByID(userID);

        // 비밀번호 변경
        // + 로그아웃
        const result = await this.userRepository.update(
            { id: userID },
            {
                pwd: this.createPassword(pwd),
                logoutAt: new Date(),
                isLogin: false,
            },
        );
        const isSuccess = result.affected ? true : false;

        // 메세지 반환
        return new ResultMessage({
            id: userID,
            isSuccess,
            contents: isSuccess
                ? MESSAGES.USER_UPDATE_PWD_SUCCESSED
                : MESSAGES.USER_UPDATE_PWD_FAILED,
        });
    }

    /**
     * 회원 정보 수정
     * @param userID
     * @param updateInput
     * @returns 수정된 회원 정보
     */
    async updateLoginUser(
        userID: string,
        updateInput: UpdateUserInput,
    ): Promise<UserEntity> {
        // 검색
        const user = await this.findOneByID(userID);

        // 존재 여부 확인
        await this.userCheckService.checkValidUser(user);

        // 수정
        return await this.userRepository.save({
            ...user,
            ...updateInput,
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
                ? MESSAGES.USER_RESTORE_SUCCESSED
                : MESSAGES.USER_RESTORE_FAILED,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 회원 삭제 ( Real )
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
                ? MESSAGES.USER_DELETE_SUCCESSED
                : MESSAGES.USER_DELETE_FAILED,
        });
    }

    /**
     * 회원 삭제 ( Soft )
     * @param userID
     * @returns ResultMessage
     */
    async softDelete(
        userID: string, //
    ): Promise<ResultMessage> {
        const result = await this.userRepository.update(
            { id: userID },
            { deleteAt: new Date(), isLogin: false, logoutAt: new Date() },
        );

        return new ResultMessage({
            id: userID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? MESSAGES.USER_SOFT_DELETE_SUCCESSED
                : MESSAGES.USER_SOFT_DELETE_FAILED,
        });
    }
}
