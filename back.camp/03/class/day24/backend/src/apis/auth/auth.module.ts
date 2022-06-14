import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtRefreshStrategy } from "../../commons/auth/jwt-refresh.strategy";
import { OAuthGoogleStrategy } from "../../commons/auth/oauth-google.strategy";
import UserModule from "../users/users.module";
import { AuthController } from "./auth.controller";
import AuthResolver from "./auth.resolver";
import AuthService from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            signOptions: { expiresIn: "60d" },
        }),
        UserModule,
    ],
    controllers: [
        AuthController, //
    ],
    providers: [
        OAuthGoogleStrategy,
        JwtRefreshStrategy, //
        AuthResolver,
        AuthService,
    ],
})
export default class AuthModule {}
