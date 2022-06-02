import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import CreateProductCategoryInput from './dto/createProductCategory.input';
import FetchProductCategoryOutput from './dto/fetchProductCategory.output';
import ProductCategoryEntity from './entities/productCategory.entity';
import ProductCategorySearchEntity from './entities/productCategorySearch.entity';
import ProductCategoryService from './productCategory.service';

@Resolver()
export default class ProductCategoryResolver {
    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    // GET Category Tree 전체 조회
    @Query(() => [FetchProductCategoryOutput])
    fetchCategorysByTree(): Promise<FetchProductCategoryOutput[]> {
        return this.productCategoryService.findAllByTree();
    }

    // GET Search Category 전체 조회
    @Query(() => [ProductCategorySearchEntity])
    fetchCategorys(): Promise<ProductCategorySearchEntity[]> {
        return this.productCategoryService.findAllBySearch();
    }

    // GET Category Tree 단일 조회
    @Query(() => FetchProductCategoryOutput)
    fetchCategoryByTree(
        @Args('categoryID') categoryID: string, //
    ): Promise<FetchProductCategoryOutput> {
        return this.productCategoryService.findByTree(categoryID);
    }

    // POST Category 생성
    @Mutation(() => ProductCategoryEntity)
    async createCategory(
        @Args('createProductCategoryInput')
        createProductCategoryInput: CreateProductCategoryInput,
    ): Promise<ProductCategoryEntity> {
        return await this.productCategoryService.createTree(
            createProductCategoryInput, //
        );
    }

    // POST Category 생성
    @Mutation(() => [ProductCategorySearchEntity])
    async createCategorySearch(): Promise<ProductCategorySearchEntity[]> {
        return await this.productCategoryService.createSarchCategory();
    }

    // DELETE Category 단일 삭제
    @Mutation(() => String)
    async deleteCategory(
        @Args('categoryID') categoryID: string,
    ): Promise<string> {
        await this.productCategoryService.deleteTree(categoryID);
        return 'Category Delete';
    }

    // DELETE Category 전체 삭제
    @Mutation(() => String)
    async deleteCategoryAll(): Promise<string> {
        await this.productCategoryService.deleteAll();
        return 'Category All Delete';
    }
}
