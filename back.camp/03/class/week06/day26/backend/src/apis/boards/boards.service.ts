import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreateBoardInput from "./dto/createBoard.input";
import BoardEntity from "./entities/board.entity";

@Injectable()
export default class BoardsService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>
    ) {}

    async findAll() {
        return await this.boardRepository.find({});
    }

    async findOne(boardID: string) {
        return await this.boardRepository.findOne({
            where: { id: boardID },
        });
    }

    async create(createBoardInput: CreateBoardInput) {
        return await this.boardRepository.save({
            ...createBoardInput,
        });
    }
}
