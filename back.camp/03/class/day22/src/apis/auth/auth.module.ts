import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtRefreshStrategy } from "src/commons/auth/jwt-refresh.strategy";
import UserModule from "../users/users.module";
import AuthResolver from "./auth.resolver";
import AuthService from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            signOptions: { expiresIn: "60d" },
        }),
        UserModule,
    ],
    providers: [
        AuthResolver, //
        AuthService,
        JwtRefreshStrategy,
    ],
})
export default class AuthModule {}
