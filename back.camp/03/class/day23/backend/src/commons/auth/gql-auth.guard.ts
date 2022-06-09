import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

/**
 * User Resolver => GQL Auth Guard => JwtAccessStrategy
 */
export class GqlJwtAccessAccessGuard extends AuthGuard("jwtAccessGuard") {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}

export class GqlJwtAccessRefreshGuard extends AuthGuard("jwtRefreshGuard") {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
