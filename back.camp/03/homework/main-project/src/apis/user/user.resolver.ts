import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import LoginInput from './dto/Login.input';
import SignupInput from './dto/Signup.input';
import UpdateUserInput from './dto/updateUser.input';

import UserEntity from './entities/user.entity';
import UserService from './user.service';

@Resolver()
export default class UserResolver {
    constructor(
        private readonly userService: UserService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    // GET 전체 조회
    @Query(() => [UserEntity])
    fetchUsers(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    // GET 단일 조회
    @Query(() => UserEntity, { nullable: true })
    fetchUser(
        @Args('userID') userID: string, //
    ): Promise<UserEntity> {
        return this.userService.findOne(userID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    // POST 회원가입
    @Mutation(() => UserEntity)
    createUser(
        @Args('signupInput') signupInput: SignupInput, //
    ): Promise<UserEntity> {
        return this.userService.Signup(signupInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    // PATCH 회원 정보 수정
    @Mutation(() => UserEntity)
    updateUser(
        @Args('userID') userID: string,
        @Args('updateUserInput') updateInput: UpdateUserInput,
    ): Promise<UserEntity> {
        return this.userService.update(userID, updateInput);
    }

    // POST 로그인
    @Mutation(() => ResultMessage)
    Login(
        @Args('loginInput') loginInput: LoginInput, //
    ) {
        return this.userService.Login(loginInput);
    }

    // POST 로그아웃
    @Mutation(() => ResultMessage)
    Logout(
        @Args('userID') userID: string, //
    ) {
        return this.userService.Logout(userID);
    }

    // PATCH 회원 탈퇴 취소
    @Mutation(() => ResultMessage)
    restoreUser(
        @Args('userID') userID: string, //
    ): Promise<ResultMessage> {
        return this.userService.restore(userID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    // DELETE 단일 유저 삭제 ( 삭제 O )
    @Mutation(() => ResultMessage)
    deleteUser(
        @Args('userID') userID: string, //
    ): Promise<ResultMessage> {
        return this.userService.delete(userID);
    }

    // DELETE 단일 유저 삭제 ( 삭제 X )
    @Mutation(() => ResultMessage)
    softDeleteUser(
        @Args('userID') userID: string, //
    ): Promise<ResultMessage> {
        return this.userService.softDelete(userID);
    }
}
