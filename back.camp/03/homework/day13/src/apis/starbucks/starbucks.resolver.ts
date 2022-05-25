import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStarbucksInput } from "./dto/createStarbucks.input";
import { StarbucksEntity } from "./entities/starbuck.entity";
import { StarbucksService } from "./starbucks.service";

@Resolver()
export class StarbucksResolve {
    constructor(private readonly starbucksService: StarbucksService) {}

    @Query(() => [StarbucksEntity])
    fetchStarbucks(): Array<StarbucksEntity> {
        return this.starbucksService.findAll();
    }

    @Mutation(() => String)
    createStarbucks(
        @Args("createStarbucksInput") createStarbucksInput: CreateStarbucksInput
    ): String {
        console.log(createStarbucksInput);
        return this.starbucksService.create(createStarbucksInput);
    }
}
