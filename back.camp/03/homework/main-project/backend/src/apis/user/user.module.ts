import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserCheckService } from './userCheck.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity, //
        ]),
    ],
    exports: [
        UserService, //
        UserCheckService,
    ],
    controllers: [
        UserController, //
    ],
    providers: [
        UserResolver, //
        UserService,
        UserCheckService,
    ],
})
export class UserModule {}
