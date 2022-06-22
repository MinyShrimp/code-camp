import { Controller, Get, Post } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern({ cmd: "fetch.boards" })
    fetchBoards(
        data: any //
    ): string[] {
        console.log(data); // {}
        return ["게시글 조회 성공"];
    }
}
