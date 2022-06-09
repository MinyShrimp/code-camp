
import { ProductTagEntity } from "../../apis/productTag/entities/productTag.entity";
import { Resource } from "../interfaces/resource.interface";

export const ProductTagResource: Resource = {
    resource: ProductTagEntity,
    options: {
        listProperties: [
            "id", "name", "createAt", "products"
        ],
        editProperties: [
            "id", "name", "products"
        ],
        showProperties: [
            "id", "name", "createAt", "products"
        ]
    }
}