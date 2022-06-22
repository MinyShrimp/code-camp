import { AppService } from "./app.service";
import { Mutation, Resolver } from "@nestjs/graphql";

@Resolver()
export class AppResolver {
    constructor(private readonly appService: AppService) {}

    @Mutation(() => String)
    login(): string {
        return "login Complete";
    }
}
