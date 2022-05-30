import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import BoardsResolver from "./boards.resolver";
import BoardsService from "./boards.service";
import BoardEntity from "./entities/board.entity";

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity])],
    controllers: [],
    providers: [BoardsResolver, BoardsService],
})
export default class BoardsModule {}
