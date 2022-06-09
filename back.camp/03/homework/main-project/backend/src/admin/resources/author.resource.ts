import { AuthorEntity } from "../../apis/author/entities/author.entity";
import { Resource } from "../interfaces/resource.interface";

export const AuthorResource: Resource = {
    resource: AuthorEntity,
    options: {
        listProperties: ["id", "name", "description", "createAt", "updateAt"],
        editProperties: ["name", "description", "deleteAt"],
        showProperties: ["id", "name", "description", "createAt", "updateAt", "deleteAt"]
    }
};