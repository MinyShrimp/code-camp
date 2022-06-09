import { BookImageEntity } from "../../apis/bookImage/entities/bookImage.entity";
import { Resource } from "../interfaces/resource.interface";

export const BookImageResource: Resource = {
    resource: BookImageEntity,
    options: {
        listProperties: [
            "id", "url", "isMain", 
            "book", "createAt", "updateAt"
        ],
        editProperties: [
            "url", "isMain", "deleteAt"
        ],
        showProperties: [
            "id", "url", "isMain", "book", 
            "createAt", "updateAt", "deleteAt"
        ]
    }
}