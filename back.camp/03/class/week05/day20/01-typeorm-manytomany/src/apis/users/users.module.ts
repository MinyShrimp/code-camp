import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import UserEntity from "./entities/user.entity";
import UserResolver from "./users.resolver";
import UserService from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity, //
        ]),
    ],
    providers: [
        UserResolver, //
        UserService,
    ],
})
export default class UserModule {}
