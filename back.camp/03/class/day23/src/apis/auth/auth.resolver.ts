import { UnprocessableEntityException } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import * as bcrypt from "bcrypt";

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
        @Args("loginInput") loginInput: LoginInput //
    ): Promise<string> {
        // 이메일로 비번 찾기
        const user = await this.userService.findOneByEmail(loginInput.email);

        // 비밀번호 검사
        const isAuth = bcrypt.compareSync(loginInput.pwd, user.pwd);
        if (!isAuth) {
            throw new UnprocessableEntityException("비밀번호가 일치하지 않습니다.");
        }

        // JWT
        return await this.authService.getAccessToken(user);
    }
}
