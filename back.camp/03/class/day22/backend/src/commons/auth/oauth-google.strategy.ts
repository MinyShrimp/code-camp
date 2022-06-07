import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

/**
 * AuthGuard("google") => OAuthGoogleStrategy =>
 */
export class OAuthGoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor() {
        super({
            clientID: process.env.OAUTH_GOOGLE_ID,
            clientSecret: process.env.OAUTH_GOOGLE_SECRET,
            callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
            scope: ["email", "profile"],
        });
    }

    /**
     * 검증 성공 시 실행
     */
    validate(
        accessToken: string, //
        _: string,
        profile: any
    ) {
        const user_info = profile._json;

        return {
            email: user_info.email,
            name: user_info.name,
        };

        // return {
        //     accessToken,
        //     refreshToken,
        //     profile,
        // };
    }
}
