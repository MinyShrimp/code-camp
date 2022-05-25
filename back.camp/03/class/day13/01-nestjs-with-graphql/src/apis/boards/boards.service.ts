import { Injectable } from "@nestjs/common";

@Injectable()
export class BoardsService {
    getHello = (): String => {
        return "Hello World!";
    };
}
