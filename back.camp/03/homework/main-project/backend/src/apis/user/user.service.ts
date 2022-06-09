import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';

import { UpdateUserInput } from './dto/updateUser.input';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

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
    // 생성 //

    /* Auth Service로 이관됨 */

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 회원 정보 수정
     * @param user
     * @param updateInput
     * @returns 수정된 회원 정보
     */
    async updateUser(
        user: UserEntity, //
        updateInput: UpdateUserInput,
    ): Promise<UserEntity> {
        const { ...input } = updateInput;

        return await this.userRepository.save({
            ...user,
            ...input,
        });
    }

    async updateAmount(
        userID: string, //
        amount: number,
    ): Promise<UpdateResult> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id', 'user.point'])
            .where(`user.id = "${userID}"`)
            .getOne();

        return await this.userRepository.update(
            { id: user.id },
            { point: user.point + amount },
        );
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
        const result = await this.userRepository.softDelete({
            id: userID,
        });

        return new ResultMessage({
            id: userID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? MESSAGES.USER_SOFT_DELETE_SUCCESSED
                : MESSAGES.USER_SOFT_DELETE_FAILED,
        });
    }
}
