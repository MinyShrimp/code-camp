import { Args, Mutation, Resolver } from '@nestjs/graphql';

import CreateProductCategoryInput from './dto/createProductCategory.input';
import ProductCategorySearchEntity from './entities/productCategorySearch.entity';
import ProductCategoryService from './productCategory.service';

@Resolver()
export default class ProductCategoryResolver {
    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    // POST Category 생성
    @Mutation(() => ProductCategorySearchEntity)
    async createCategory(
        @Args('createProductCategoryInput')
        createProductCategoryInput: CreateProductCategoryInput,
    ): Promise<ProductCategorySearchEntity> {
        return await this.productCategoryService.create(
            createProductCategoryInput, //
        );
    }

    @Mutation(() => String)
    deleteCategoryAll() {
        this.productCategoryService.deleteAll();
        return 'Category Delete';
    }
}
