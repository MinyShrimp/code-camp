import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

/**
 * GQL Auth Guard => JwtAccessStrategy => GQL User Param
 */
export class JwtAccessStrategy extends PassportStrategy(Strategy, "jwtAccessGuard") {
    constructor() {
        super({
            // jwtFromRequest: (req) => req.headers.Authorization.replace("Bearer", "") },
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_KEY,
        });
    }

    /**
     * 검증 성공 시 실행
     */
    validate(payload: any) {
        /* req.user */
        return {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
        };
    }
}
