
import { ProductEntity } from "../../apis/product/entities/product.entity";
import { Resource } from "../interfaces/resource.interface";

export const ProductResource: Resource = {
    resource: ProductEntity,
    options: {
        listProperties: [
            "id", "url", "price",
            "stock_count", "selling_count", 
            "book", "productCategory", "productTags"
        ],
        editProperties: [
            "url", "price",
            "stock_count", "selling_count", 
            "book", "productCategory", "productTags",
            "deleteAt"
        ],
        showProperties: [
            "id", "url", "price",
            "stock_count", "selling_count", 
            "book", "productCategory", "productTags",
            "createAt", "updateAt", "deleteAt"
        ]
    }
}