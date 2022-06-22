import { Controller, Get, Post } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern({ cmd: "auth.login" })
    login(
        data: { name: string; email: string; pwd: string } //
    ): string {
        console.log(data);
        return "login Complete";
    }
}
