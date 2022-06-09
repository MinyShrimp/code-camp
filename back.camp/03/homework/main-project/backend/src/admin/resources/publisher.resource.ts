import { PublisherEntity } from "../../apis/publisher/entities/publisher.entity";
import { Resource } from "../interfaces/resource.interface";

export const PublisherResource: Resource = {
    resource: PublisherEntity,
    options: {
        listProperties: ["id", "name", "description", "createAt", "updateAt"],
        editProperties: ["name", "description", "deleteAt"],
        showProperties: ["id", "name", "description", "createAt", "updateAt", "deleteAt"]
    }
};