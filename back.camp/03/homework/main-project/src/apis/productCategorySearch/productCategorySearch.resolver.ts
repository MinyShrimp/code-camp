import { Mutation, Query, Resolver } from '@nestjs/graphql';

import ProductCategorySearchEntity from './entities/productCategorySearch.entity';
import ProductCategorySearchService from './productCategorySearch.service';

@Resolver()
export default class ProductCategorySearchResolver {
    constructor(
        private readonly categorySearchService: ProductCategorySearchService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    // GET Search Category 전체 조회
    @Query(() => [ProductCategorySearchEntity])
    fetchCategorys(): Promise<ProductCategorySearchEntity[]> {
        return this.categorySearchService.findAllBySearch();
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    // POST Category 생성
    @Mutation(() => [ProductCategorySearchEntity])
    async createCategorySearch(): Promise<ProductCategorySearchEntity[]> {
        return await this.categorySearchService.createSarchCategory();
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
