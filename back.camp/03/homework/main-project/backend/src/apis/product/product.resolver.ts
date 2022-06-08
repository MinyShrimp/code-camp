import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ResultMessage } from '../../commons/dto/ResultMessage.dto';

import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';

import { ProductService } from './product.service';

/**
 * 상품 API
 */
@Resolver()
export class ProductResolver {
    constructor(
        private readonly productService: ProductService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/products
     * @response 모든 상품 목록
     */
    @Query(
        () => [ProductEntity], //
        { description: '모든 상품 조회' },
    )
    fetchProducts(): Promise<ProductEntity[]> {
        return this.productService.findAll();
    }

    /**
     * GET /admin/products
     * @response 삭제된 데이터를 포함한 모든 상품 목록
     */
    @Query(
        () => [ProductEntity], //
        { description: '삭제된 데이터를 포함한 모든 상품 조회' },
    )
    fetchProductsWithDeleted(): Promise<ProductEntity[]> {
        return this.productService.findAllWithDeleted();
    }

    /**
     * GET /api/product/:id
     * @param productID
     * @response 단일 상품
     */
    @Query(
        () => ProductEntity, //
        { description: '단일 상품 조회', nullable: true },
    )
    fetchProduct(
        @Args('productID') productID: string, //
    ): Promise<ProductEntity> {
        return this.productService.findOne(productID);
    }

    /**
     * GET /admin/product/:id
     * @param productID
     * @response 삭제된 데이터를 포함한 단일 상품
     */
    @Query(
        () => ProductEntity, //
        {
            description: '삭제된 데이터를 포함한 단일 상품 조회',
            nullable: true,
        },
    )
    fetchProductWithDeleted(
        @Args('productID') productID: string, //
    ): Promise<ProductEntity> {
        return this.productService.findOneWithDeleted(productID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/product
     * @param createProductInput
     * @response 생성된 상품 정보
     */
    @Mutation(
        () => ProductEntity, //
        { description: '상품 정보 생성' },
    )
    createProduct(
        @Args('createProductInput') createProductInput: CreateProductInput,
    ): Promise<ProductEntity> {
        return this.productService.create(createProductInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/product/:id
     * @param productID
     * @param updateProductInput
     * @response 수정된 상품 정보
     */
    @Mutation(
        () => ProductEntity, //
        { description: '상품 정보 수정' },
    )
    async updateProduct(
        @Args('productID') productID: string,
        @Args('updateProductInput') updateProductInput: UpdateProductInput,
    ): Promise<ProductEntity> {
        return this.productService.update(productID, updateProductInput);
    }

    /**
     * PUT /api/product/:id
     * @param productID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '상품 정보 삭제 취소' },
    )
    async restoreProduct(
        @Args('productID') productID: string,
    ): Promise<ResultMessage> {
        return await this.productService.restore(productID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/products
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '모든 상품 삭제 ( Real )' },
    )
    async deleteProductAll(): Promise<ResultMessage> {
        return await this.productService.deleteAll();
    }

    /**
     * DELETE /admin/products/soft
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '모든 상품 삭제 ( Soft )' },
    )
    async softDeleteProductAll(): Promise<ResultMessage> {
        return await this.productService.softDeleteAll();
    }

    /**
     * DELETE /admin/product/:id
     * @param productID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '단일 상품 삭제 ( Real )' },
    )
    async deleteProduct(
        @Args('productID') productID: string, //
    ): Promise<ResultMessage> {
        return await this.productService.delete(productID);
    }

    /**
     * DELETE /api/product/:id
     * @param productID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '단일 상품 삭제 ( Soft )' },
    )
    async softDeleteProduct(
        @Args('productID') productID: string, //
    ): Promise<ResultMessage> {
        return await this.productService.softDelete(productID);
    }
}
