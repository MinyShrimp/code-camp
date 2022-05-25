import { Injectable } from "@nestjs/common";
import { CreateStarbucksInput } from "./dto/createStarbucks.input";
import { StarbucksEntity } from "./entities/starbuck.entity";

@Injectable()
export class StarbucksService {
    id: number = 1;
    menus: Array<StarbucksEntity> = [];

    findAll(): Array<StarbucksEntity> {
        return this.menus;
    }

    create(createStarbucksInput: CreateStarbucksInput): String {
        this.menus.push({
            id: this.id++,
            ...createStarbucksInput,
        });
        return "등록에 성공하였습니다.";
    }
}
