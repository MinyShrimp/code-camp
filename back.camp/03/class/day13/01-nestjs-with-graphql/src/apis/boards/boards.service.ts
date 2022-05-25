import { Injectable } from "@nestjs/common";

@Injectable()
export default class BoardsService {
    getHello = (): String => {
        return "Hello World!";
    };
}
