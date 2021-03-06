import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserCheckService } from './userCheck.service';
import { UserAdminController } from './user.admin.controller';
import { UserAdminRepository } from './entities/user.admin.repository';

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
        UserAdminController, //
    ],
    providers: [
        UserResolver, //
        UserService,
        UserCheckService,

        UserAdminRepository,
    ],
})
export class UserModule {}
