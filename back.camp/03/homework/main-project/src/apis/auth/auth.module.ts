import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';

import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity, //
        ]),
        JwtModule.register({}),
        UserModule,
    ],
    providers: [
        AuthResolver, //
        AuthService,
        JwtAccessStrategy,
        JwtRefreshStrategy,
    ],
})
export class AuthModule {}
