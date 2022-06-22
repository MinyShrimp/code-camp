import { AppService } from "./app.service";
import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class AppResolver {
    constructor(private readonly appService: AppService) {}

    @Query(() => String)
    fetchBoards(): string[] {
        return ["게시글 조회 성공"];
    }
}
