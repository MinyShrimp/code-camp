import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import CreateProductCategoryInput from './dto/createProductCategory.input';
import ProductCategoryEntity from './entities/productCategory.entity';
import ProductCategoryService from './productCategory.service';

@Resolver()
export default class ProductCategoryResolver {
    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    // GET Category Tree 전체 조회
    @Query(() => [ProductCategoryEntity])
    fetchCategorysByTree(): Promise<ProductCategoryEntity[]> {
        return this.productCategoryService.findAllByTree();
    }

    // GET Category Tree 단일 조회
    @Query(() => ProductCategoryEntity)
    fetchCategoryByTree(
        @Args('categoryID') categoryID: string, //
    ): Promise<ProductCategoryEntity> {
        return this.productCategoryService.findByTree(categoryID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

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

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    // DELETE Category 단일 삭제
    @Mutation(() => ResultMessage)
    async deleteCategory(
        @Args('categoryID') categoryID: string,
    ): Promise<ResultMessage> {
        return await this.productCategoryService.deleteTree(categoryID);
    }

    // DELETE Category 전체 삭제
    @Mutation(() => ResultMessage)
    async deleteCategoryAll(): Promise<ResultMessage> {
        return await this.productCategoryService.deleteAll();
    }
}
