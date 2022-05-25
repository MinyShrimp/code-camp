import { Module } from "@nestjs/common";
import { StarbucksResolve } from "./starbucks.resolver";
import { StarbucksService } from "./starbucks.service";

@Module({
    imports: [],
    controllers: [],
    providers: [StarbucksResolve, StarbucksService],
})
export class StarbucksModule {}
