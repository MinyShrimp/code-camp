import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import BoardsService from "./boards.service";
import BoardEntity from "./entities/board.entity";
import CreateBoardInput from "./dto/createBoard.input";

@Resolver()
export default class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    @Query((returns) => [BoardEntity])
    fetchBoards() {
        return this.boardsService.findAll();
    }

    @Mutation((returns) => String)
    createBoard(
        @Args("createBoardInput") createBoardInput: CreateBoardInput
    ): String {
        console.log(createBoardInput);
        return this.boardsService.create(createBoardInput);
    }
}
