import { Query, Resolver } from "@nestjs/graphql";
import BoardsService from "./boards.service";
// import Boards from "./boards.model";

@Resolver()
export default class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    /**
     * Decorator를 사용할 때에는
     * getHello가 화살표 함수가 아니어야합니다.
     */
    @Query((returns) => String)
    getHello(): String {
        return this.boardsService.getHello();
    }
}
