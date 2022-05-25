import { Query, Resolver } from "@nestjs/graphql";
import { BoardsService } from "./boards.service";
// import Boards from "./boards.model";

@Resolver()
export class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    @Query((returns) => String)
    getHello(): String {
        return this.boardsService.getHello();
    }
}
