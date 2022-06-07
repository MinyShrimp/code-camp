import * as bcrypt from "bcrypt";
import { UnprocessableEntityException, UseGuards } from "@nestjs/common";
import { Args, Context, GraphQLExecutionContext, Mutation, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "../../commons/auth/gql-user.param";
import { GqlAuthJwtGuard } from "../../commons/auth/gql-auth.guard";

import UserService from "../users/users.service";

import AuthService from "./auth.service";
import LoginInput from "./dto/login.input";

@Resolver()
export default class AuthResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService //
    ) {}

    @Mutation(() => String)
    async Login(
        @Context() context: GraphQLExecutionContext,
        @Args("loginInput") loginInput: LoginInput
    ): Promise<string> {
        // 이메일로 비번 찾기
        const user = await this.userService.findOneByEmail(loginInput.email);

        // 비밀번호 검사
        const isAuth = bcrypt.compareSync(loginInput.pwd, user.pwd);
        if (!isAuth) {
            throw new UnprocessableEntityException("비밀번호가 일치하지 않습니다.");
        }

        // Set RefreshToken
        // @ts-ignore
        this.authService.setRefreshToken(user, context.res);

        // Get AccessToken
        return this.authService.getAccessToken(user);
    }

    @UseGuards(GqlAuthJwtGuard)
    @Mutation(() => String)
    async restoreAccessToken(
        @CurrentUser() currentUser: any //
    ): Promise<string> {
        return this.authService.signAccessToken(currentUser);
    }
}
