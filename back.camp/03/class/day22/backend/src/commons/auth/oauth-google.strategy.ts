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
        refreshToken: string,
        profile: any
    ) {
        console.log(accessToken, refreshToken, profile);

        // return {
        //     accessToken,
        //     refreshToken,
        //     profile,
        // };
    }
}
