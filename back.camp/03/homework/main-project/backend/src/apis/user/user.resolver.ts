import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IPayload } from '../../commons/interfaces/Payload.interface';
import { CurrentUser } from '../../commons/auth/gql-user.param';
import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { GqlJwtAccessGuard } from '../../commons/auth/gql-auth.guard';

import { UpdateUserInput } from './dto/updateUser.input';

import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserCheckService } from './userCheck.service';

/* 유저 API */
@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService, //
        private readonly userCheckService: UserCheckService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /admin/users
     * @response 회원 전체 목록
     */
    @Query(
        () => [UserEntity], //
        { description: '회원 전체 조회' },
    )
    fetchUsers(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    /**
     * GET /api/user
     * - Bearer JWT
     * @response 회원 단일 조회
     */
    @UseGuards(GqlJwtAccessGuard)
    @Query(
        () => UserEntity, //
        { description: '회원 단일 조회, Bearer JWT', nullable: true },
    )
    fetchLoginUser(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<UserEntity> {
        return this.userService.findOneByID(currentUser.id);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /* Auth Resolver로 이관됨 */

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/user
     * - Bearer JWT
     * @param updateInput
     * @response 수정된 회원 정보
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => UserEntity, //
        { description: '회원 정보 수정, Bearer JWT' },
    )
    async updateLoginUser(
        @CurrentUser() currentUser: IPayload,
        @Args('updateInput') updateInput: UpdateUserInput,
    ): Promise<UserEntity> {
        const userID = currentUser.id;

        // 검색
        const user = await this.userService.findOneByID(userID);

        // 존재 여부 확인
        await this.userCheckService.checkValidUser(user);

        // 수정
        return this.userService.updateUser(user, updateInput);
    }

    /**
     * PUT /admin/user/:id
     * @param userID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '회원 탈퇴 취소, Bearer JWT' },
    )
    restoreUser(
        @Args('userID') userID: string, //
    ): Promise<ResultMessage> {
        return this.userService.restore(userID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/user/:id
     * @param userID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '회원 삭제 ( Real )' },
    )
    deleteUser(
        @Args('userID') userID: string, //
    ): Promise<ResultMessage> {
        return this.userService.delete(userID);
    }

    /**
     * DELETE /api/user
     * - Bearer JWT
     * @response ResultMessage
     */
    @UseGuards(GqlJwtAccessGuard)
    @Mutation(
        () => ResultMessage, //
        { description: '회원 탈퇴 ( Soft ), Bearer JWT' },
    )
    deleteLoginUser(
        @CurrentUser() currentUser: IPayload, //
    ): Promise<ResultMessage> {
        return this.userService.softDelete(currentUser.id);
    }
}
