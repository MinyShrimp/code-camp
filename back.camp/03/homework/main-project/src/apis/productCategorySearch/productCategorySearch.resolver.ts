import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ResultMessage from 'src/commons/dto/ResultMessage.dto';

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
        return this.categorySearchService.findAll();
    }

    // GET Search Category 단일 조회
    @Query(() => ProductCategorySearchEntity, { nullable: true })
    fetchCategory(
        @Args('categoryID') categoryID: string, //
    ): Promise<ProductCategorySearchEntity> {
        return this.categorySearchService.findOneByID(categoryID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    // POST Category 생성
    @Mutation(() => ResultMessage)
    async createCategorySearch(): Promise<ResultMessage> {
        return await this.categorySearchService.createSarchCategory();
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
