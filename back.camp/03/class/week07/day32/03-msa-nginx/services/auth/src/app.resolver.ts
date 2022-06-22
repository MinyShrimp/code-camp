import { Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class AppResolver {
    constructor() {}

    @Query(() => String)
    fetchUsers(): string {
        return "유저 목록 전체 조회";
    }

    @Mutation(() => String)
    login(): string {
        return "로그인";
    }
}
