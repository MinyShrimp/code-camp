import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthController {
    /**
     * OAuth: Google
     */
    @Get("/login/google")
    @UseGuards(AuthGuard("google"))
    LoginGoogle() {
        // 구글 로그인 진행
    }
}
