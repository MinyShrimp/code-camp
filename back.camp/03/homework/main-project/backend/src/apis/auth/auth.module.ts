import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { OAuthGoogleStrategy } from 'src/commons/auth/oauth-google.strategy';

import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
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
    controllers: [AuthController],
    providers: [
        OAuthGoogleStrategy,
        JwtRefreshStrategy,
        JwtAccessStrategy,
        AuthResolver,
        AuthService,
    ],
})
export class AuthModule {}