import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import ProductCategoryEntity from "./entities/productCategory.entity";
import ProductCategoryService from "./productCategory.service";

@Resolver()
export default class ProductCategoryResolver {
    constructor(
        private readonly productCategoryService: ProductCategoryService
    ) {}

    @Query(() => [ProductCategoryEntity])
    fetchProductAllCategory() {
        return this.productCategoryService.findAll();
    }

    @Mutation(() => ProductCategoryEntity)
    createProductCategory(
        @Args("name") name: string //
    ): Promise<ProductCategoryEntity> {
        return this.productCategoryService.create(name);
    }

    @Mutation(() => String)
    deleteCategoryAll() {
        this.productCategoryService.deleteAll();
        return "ok";
    }
}
