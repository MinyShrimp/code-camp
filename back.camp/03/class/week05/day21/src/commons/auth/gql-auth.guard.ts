import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

/**
 * User Resolver => GQL Auth Guard => JwtAccessStrategy
 */
export class GqlAuthAccessGuard extends AuthGuard("jwtGuard") {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
