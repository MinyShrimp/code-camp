import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAccessStrategy } from "src/commons/auth/jwt-access.strategy";

import { UserRepository } from "./users.repository";
import UserResolver from "./users.resolver";
import UserService from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository, //
        ]),
    ],
    exports: [UserService],
    providers: [
        UserResolver, //
        UserService,
        JwtAccessStrategy,
    ],
})
export default class UserModule {}
