import { Injectable } from "@nestjs/common";

@Injectable()
export default class BoardsService {
    getHello = (): string => {
        return "Hello World!";
    };
}
