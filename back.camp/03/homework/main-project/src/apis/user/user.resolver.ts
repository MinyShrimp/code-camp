import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

import LoginInput from './dto/Login.input';
import SignupInput from './dto/Signup.input';
import UpdateUserInput from './dto/updateUser.input';

import UserEntity from './entities/user.entity';
import UserService from './user.service';

/* 유저 API */
@Resolver()
export default class UserResolver {
    constructor(
        private readonly userService: UserService, //
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
     * GET /api/user/:id
     * @param userID
     * @response 회원 단일 조회
     */
    @Query(
        () => UserEntity, //
        { description: '회원 단일 조회', nullable: true },
    )
    fetchUser(
        @Args('userID') userID: string, //
    ): Promise<UserEntity> {
        return this.userService.findOne(userID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/signup
     * @param signupInput
     * @response 생성된 회원 정보
     */
    @Mutation(
        () => UserEntity, //
        { description: '회원가입' },
    )
    createUser(
        @Args('signupInput') signupInput: SignupInput, //
    ): Promise<UserEntity> {
        return this.userService.Signup(signupInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/user/:id
     * @param userID
     * @param updateInput
     * @response 수정된 회원 정보
     */
    @Mutation(
        () => UserEntity, //
        { description: '회원 정보 수정' },
    )
    updateUser(
        @Args('userID') userID: string,
        @Args('updateUserInput') updateInput: UpdateUserInput,
    ): Promise<UserEntity> {
        return this.userService.update(userID, updateInput);
    }

    /**
     * POST /api/login
     * @param loginInput
     * @response 로그인된 회원 정보
     */
    @Mutation(
        () => UserEntity, //
        { description: '로그인' },
    )
    Login(
        @Args('loginInput') loginInput: LoginInput, //
    ): Promise<UserEntity> {
        return this.userService.Login(loginInput);
    }

    /**
     * POST /api/logout
     * @param userID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '로그아웃' },
    )
    Logout(
        @Args('userID') userID: string, //
    ): Promise<ResultMessage> {
        return this.userService.Logout(userID);
    }

    /**
     * PUT /api/user/:id
     * @param userID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '회원 탈퇴 취소' },
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
     * DELETE /api/user/:id
     * @param userID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '회원 탈퇴 ( Soft )' },
    )
    softDeleteUser(
        @Args('userID') userID: string, //
    ): Promise<ResultMessage> {
        return this.userService.softDelete(userID);
    }
}
