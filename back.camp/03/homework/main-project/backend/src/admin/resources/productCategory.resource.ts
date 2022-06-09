
import { ProductCategoryEntity } from "../../apis/productCategory/entities/productCategory.entity";
import { Resource } from "../interfaces/resource.interface";

export const ProductCategoryResource: Resource = {
    resource: ProductCategoryEntity,
    options: {
        listProperties: [
            "id", "name", "chilren", "parent",
        ],
        editProperties: [
            "id", "name", "chilren", "parent",
        ],
        showProperties: [
            "id", "name", "chilren", "parent",
        ]
    }
}