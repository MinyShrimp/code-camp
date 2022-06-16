import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CACHE_MANAGER, Inject, UnprocessableEntityException } from "@nestjs/common";
import { Cache } from "cache-manager";

import BoardEntity from "./entities/board.entity";
import CreateBoardInput from "./dto/createBoard.input";
import BoardsService from "./boards.service";

@Resolver()
export default class BoardsResolver {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
        private readonly boardsService: BoardsService //
    ) {}

    @Query(() => [BoardEntity])
    fetchBoards() {
        return this.boardsService.findAll();
    }

    @Mutation(() => BoardEntity)
    async createBoard(
        @Args("createBoardInput") createBoardInput: CreateBoardInput //
    ): Promise<BoardEntity> {
        const board = await this.boardsService.create(createBoardInput);
        this.cacheManager.set(`board:${board.id}`, board, { ttl: 0 });
        return board;
    }

    @Query(() => BoardEntity)
    async fetchBoard(
        @Args("boardID") boardID: string //
    ): Promise<BoardEntity> {
        const redis_board = await this.cacheManager.get(`board:${boardID}`);
        if (redis_board) {
            return redis_board as BoardEntity;
        }

        const mysql_board = await this.boardsService.findOne(boardID);
        if (!mysql_board) {
            throw new UnprocessableEntityException("찾을 수 없습니다");
        }
        this.cacheManager.set(`board:${mysql_board.id}`, mysql_board, { ttl: 0 });
        return mysql_board;
    }
}
