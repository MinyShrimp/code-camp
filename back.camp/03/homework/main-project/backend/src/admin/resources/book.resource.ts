import { BookEntity } from "../../apis/book/entities/book.entity";
import { Resource } from "../interfaces/resource.interface";

export const BookResource: Resource = {
    resource: BookEntity,
    options: {
        listProperties: [
            "id", "title", "subtitle", 
            "description", "page", 
            "isbn_10", "isbn_13", "publish_at"
        ],
        editProperties: [
            "title", "subtitle", "description", 
            "page", "isbn_10", "isbn_13", 
            "publish_at", "deleteAt"
        ],
        showProperties: [
            "id", "title", "subtitle", "description", 
            "page", "isbn_10", "isbn_13",
            "publisher", "author", "book_images",
            "publish_at", "createAt", "updateAt", "deleteAt", 
        ]
    }
}