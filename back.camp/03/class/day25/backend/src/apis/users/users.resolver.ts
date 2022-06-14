import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import SignupInput from "./dto/signup.input";

import UserEntity from "./entities/user.entity";
import UserService from "./users.service";
import { GqlJwtAccessAccessGuard } from "src/apis/commons/auth/gql-auth.guard";
import { CurrentUser } from "src/apis/commons/auth/gql-user.param";

@Resolver()
export default class UserResolver {
    constructor(
        private readonly userService: UserService //
    ) {}

    @Query(() => [UserEntity])
    fetchUsers(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    /**
     * User Resolver => GQL Auth Guard => JwtAccessStrategy => GQL User Param => User Resolver
     */
    @UseGuards(GqlJwtAccessAccessGuard)
    @Query(() => String)
    fetchUser(
        @CurrentUser() currentUser: any //
    ): string {
        console.log(currentUser);
        return "조회 성공";
    }

    @Mutation(() => UserEntity)
    signUp(
        @Args("signupInput") signupInput: SignupInput //
    ): Promise<UserEntity> {
        return this.userService.create(signupInput);
    }
}
