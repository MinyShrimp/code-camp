import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import BoardsService from "./boards.service";
import BoardEntity from "./entities/board.entity";
import CreateBoardInput from "./dto/createBoard.input";

@Resolver()
export default class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    // @Query, @Mutation 을 사용할 때에는
    // getHello가 화살표 함수가 아니어야합니다.
    @Query((returns) => [BoardEntity])
    fetchBoards() {
        return this.boardsService.findAll();
    }

    // @Mutation((returns) => String)
    // createBoard(
    //     @Args("writer") writer: string,
    //     @Args("title") title: string,
    //     @Args({ name: "contents", nullable: true }) contents: string
    // ): String {
    //     console.log(writer, title, contents);
    //     return this.boardsService.create();
    // }

    @Mutation((returns) => String)
    createBoard(
        @Args("createBoardInput") createBoardInput: CreateBoardInput
    ): String {
        console.log(createBoardInput);
        return this.boardsService.create(createBoardInput);
    }
}
