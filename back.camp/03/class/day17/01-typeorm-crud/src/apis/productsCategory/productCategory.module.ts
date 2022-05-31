import { Module } from "@nestjs/common";
import ProductCategoryResolver from "./productCategory.resolver";
import ProductCategoryService from "./productCategory.service";

@Module({
    imports: [],
    providers: [ProductCategoryResolver, ProductCategoryService],
})
export default class ProductCategoryModule {}
