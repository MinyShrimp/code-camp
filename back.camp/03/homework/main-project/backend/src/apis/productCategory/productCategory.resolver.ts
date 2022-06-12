import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlJwtAdminGuard } from '../../commons/auth/gql-auth.guard';
import { ResultMessage } from '../../commons/message/ResultMessage.dto';

import { CreateProductCategoryInput } from './dto/createProductCategory.input';
import { ProductCategoryEntity } from './entities/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

/* 상품 분류 API */
@Resolver()
export class ProductCategoryResolver {
    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /admin/product/categorys
     * @response 조회된 전체 분류 정보
     */
    // @UseGuards(GqlJwtAdminGuard)
    @Query(
        () => [ProductCategoryEntity], //
        { description: '모든 분류 정보 조회' },
    )
    fetchCategorysByTree(): Promise<ProductCategoryEntity[]> {
        return this.productCategoryService.findAllByTree();
    }

    /**
     * GET /admin/product/category/:id
     * @param categoryID
     * @response 조회된 단일 분류 정보
     */
    @Query(
        () => ProductCategoryEntity, //
        { description: '단일 분류 정보 조회' },
    )
    fetchCategoryByTree(
        @Args('categoryID') categoryID: string, //
    ): Promise<ProductCategoryEntity> {
        return this.productCategoryService.findByTree(categoryID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /admin/product/category
     * @param createProductCategoryInput
     * @response 생성된 분류 정보
     */
    @Mutation(
        () => ProductCategoryEntity, //
        { description: '분류 생성' },
    )
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

    /**
     * DELETE /admin/product/category/:id
     * @param categoryID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '분류 단일 삭제' },
    )
    async deleteCategory(
        @Args('categoryID') categoryID: string,
    ): Promise<ResultMessage> {
        return await this.productCategoryService.deleteTree(categoryID);
    }

    /**
     * DELETE /admin/product/categorys
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '분류 전체 삭제' },
    )
    async deleteCategoryAll(): Promise<ResultMessage> {
        return await this.productCategoryService.deleteAll();
    }
}
