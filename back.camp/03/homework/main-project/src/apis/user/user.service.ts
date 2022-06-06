import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ResultMessage } from '../../commons/dto/ResultMessage.dto';

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

    /* UserCheck Service로 이관됨 */

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
                ? `Completed User Delete`
                : `Failed User Delete`,
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
                ? `Completed User Soft Delete`
                : `Failed User Soft Delete`,
        });
    }
}
