import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class OAuthGoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.OAUTH_GOOGLE_ID,
            clientSecret: process.env.OAUTH_GOOGLE_SECRET,
            callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        });
    }

    validate(token: string, _: string, profile: any) {
        const user_info = profile._json;

        return {
            email: user_info.email,
            name: user_info.name,
        };
    }
}
