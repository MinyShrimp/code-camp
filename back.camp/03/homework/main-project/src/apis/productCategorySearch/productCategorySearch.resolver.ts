import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

import ProductCategorySearchEntity from './entities/productCategorySearch.entity';
import ProductCategorySearchService from './productCategorySearch.service';

/* 검색용 분류 API */
@Resolver()
export default class ProductCategorySearchResolver {
    constructor(
        private readonly categorySearchService: ProductCategorySearchService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/product/categorys
     * @response 조회된 전체 분류 목록
     */
    @Query(
        () => [ProductCategorySearchEntity], //
        { description: 'Search Category 전체 조회' },
    )
    fetchCategorys(): Promise<ProductCategorySearchEntity[]> {
        return this.categorySearchService.findAll();
    }

    /**
     * GET /api/product/category/:id
     * @param categoryID
     * @response 조회된 분류 정보
     */
    @Query(
        () => ProductCategorySearchEntity, //
        { description: 'Search Category 단일 조회', nullable: true },
    )
    fetchCategory(
        @Args('categoryID') categoryID: string, //
    ): Promise<ProductCategorySearchEntity> {
        return this.categorySearchService.findOneByID(categoryID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/product/categorys
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: 'Search Category 전체 생성' },
    )
    async createCategorySearch(): Promise<ResultMessage> {
        return await this.categorySearchService.createSarchCategory();
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
