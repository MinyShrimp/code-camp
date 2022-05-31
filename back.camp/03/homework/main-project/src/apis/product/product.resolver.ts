/* Product Resolver */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import ProductEntity from './entities/product.entity';
import CreateProductInput from './dto/createProduct.input';
import UpdateProductInput from './dto/updateProduct.input';
import ProductService from './product.service';

@Resolver()
export default class ProductResolver {
    /**
     * 생성자
     * @param productService
     */
    constructor(
        private readonly productService: ProductService, //
    ) {}

    /**
     * GET 모든 상품 조회
     * @returns 모든 상품 목록
     */
    @Query(() => [ProductEntity])
    fetchProducts(): Promise<ProductEntity[]> {
        return this.productService.findAll();
    }

    /**
     * GET 단일 상품 조회
     * @param productID
     * @returns 단일 상품
     */
    @Query(() => ProductEntity)
    fetchProduct(
        @Args('productID') productID: string, //
    ): Promise<ProductEntity> {
        return this.productService.findOne(productID);
    }

    /**
     * POST 상품 생성
     * @param createProductInput
     * @returns 생성된 상품 정보
     */
    @Mutation(() => ProductEntity)
    createProduct(
        @Args('createProductInput') createProductInput: CreateProductInput,
    ): Promise<ProductEntity> {
        return this.productService.create(createProductInput);
    }

    /**
     * PATCH 상품 수정
     * @param productID
     * @param updateProductInput
     * @returns 수정된 상품 정보
     */
    @Mutation(() => ProductEntity)
    async updateProduct(
        @Args('productID') productID: string,
        @Args('updateProductInput') updateProductInput: UpdateProductInput,
    ): Promise<ProductEntity> {
        await this.productService.checkSoldout(productID);
        return this.productService.update(productID, updateProductInput);
    }

    /**
     * 모든 상품 삭제
     * @returns MSG
     */
    @Mutation(() => String)
    async deleteProductAll(): Promise<string> {
        await this.productService.deleteAll();
        return 'ok';
    }
}
