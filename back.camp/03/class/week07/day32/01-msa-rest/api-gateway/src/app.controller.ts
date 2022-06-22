import { Controller, Get, Inject, Post, Req } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";

@Controller()
export class AppController {
    constructor(
        @Inject("AUTH_SERVICE")
        private readonly clientAuthService: ClientProxy,
        @Inject("RESOURCE_SERVICE")
        private readonly clientResourceService: ClientProxy
    ) {}

    @Get("/auth/login")
    login() {
        return this.clientAuthService.send(
            {
                cmd: "auth.login",
            },
            {
                name: "철수",
                email: "ksk7584@gmail.com",
                pwd: "qwer1234!",
            }
        );
    }

    @Get("/boards")
    fetchBoards(): string[] {
        return this.clientResourceService.send(
            {
                cmd: "fetch.boards",
            },
            {}
        ) as unknown as string[];
    }
}
