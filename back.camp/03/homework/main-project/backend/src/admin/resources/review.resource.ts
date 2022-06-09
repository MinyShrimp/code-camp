
import { ReviewEntity } from "../../apis/review/entities/review.entity";
import { Resource } from "../interfaces/resource.interface";

export const ReviewResource: Resource = {
    resource: ReviewEntity,
    options: {
        listProperties: [
            "id", "contents", "star", "like", 
            "user", "product",
            "createAt", "updateAt", 
        ],
        editProperties: [
            "contents", "star", "like", 
            "user", "product",
        ],
        showProperties: [
            "id", "contents", "star", "like", 
            "user", "product",
            "createAt", "updateAt", "deleteAt", 
        ]
    }
}