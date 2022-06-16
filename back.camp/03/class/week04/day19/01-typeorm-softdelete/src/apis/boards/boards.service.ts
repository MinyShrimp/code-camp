import { Injectable } from "@nestjs/common";
import CreateBoardInput from "./dto/createBoard.input";

@Injectable()
export default class BoardsService {
    nowId = 3;
    result = [
        {
            id: 1,
            writer: "철수",
            title: "제목입니다~~",
            contents: "내용이에요@@@",
        },
        {
            id: 2,
            writer: "영희",
            title: "영희 제목입니다~~",
            contents: "영희 내용이에요@@@",
        },
        {
            id: 3,
            writer: "훈이",
            title: "훈이 제목입니다~~",
            contents: "훈이 내용이에요@@@",
        },
    ];

    findAll() {
        return this.result;
    }

    create(createBoardInput: CreateBoardInput) {
        this.result.push({
            id: ++this.nowId,
            ...createBoardInput,
        });
        return "게시물 등록에 성공하였습니다!!";
    }
}
