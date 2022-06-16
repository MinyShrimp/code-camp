import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import SignupInput from "./dto/signup.input";

import UserEntity from "./entities/user.entity";
import UserService from "./users.service";

@Resolver()
export default class UserResolver {
    constructor(
        private readonly userService: UserService //
    ) {}

    @Query(() => [UserEntity])
    fetchUsers() {
        return this.userService.findAll();
    }

    @Mutation(() => UserEntity)
    signUp(
        @Args("signupInput") signupInput: SignupInput //
    ) {
        return this.userService.create(signupInput);
    }
}
