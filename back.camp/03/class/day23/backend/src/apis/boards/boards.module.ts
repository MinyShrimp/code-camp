import { Module } from "@nestjs/common";

import BoardsResolver from "./boards.resolver";
import BoardsService from "./boards.service";

@Module({
    imports: [],
    controllers: [],
    providers: [BoardsResolver, BoardsService],
})
export default class BoardsModule {}
