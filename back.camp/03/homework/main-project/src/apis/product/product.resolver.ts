/* Product Resolver */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

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

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * GET 모든 상품 조회
     * @returns 모든 상품 목록
     */
    @Query(() => [ProductEntity])
    fetchProducts(): Promise<ProductEntity[]> {
        return this.productService.findAll();
    }

    /**
     * GET 삭제된 데이터를 포함한 모든 상품 조회
     * @returns 삭제된 데이터를 포함한 모든 상품 목록
     */
    @Query(() => [ProductEntity])
    fetchProductsWithDeleted(): Promise<ProductEntity[]> {
        return this.productService.findAllWithDeleted();
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
     * GET 삭제된 데이터를 포함한 단일 상품 조회
     * @param productID
     * @returns 삭제된 데이터를 포함한 단일 상품
     */
    @Query(() => ProductEntity)
    fetchProductWithDeleted(
        @Args('productID') productID: string, //
    ): Promise<ProductEntity> {
        return this.productService.findOneWithDeleted(productID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

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

    ///////////////////////////////////////////////////////////////////
    // 수정 //

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
     * PATCH 상품 되살리기
     * @param productID
     * @returns 결과 Msg
     */
    @Mutation(() => ResultMessage)
    async restoreProduct(
        @Args('productID') productID: string,
    ): Promise<ResultMessage> {
        return await this.productService.restore(productID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 모든 상품 삭제 ( 삭제 O )
     * @returns 결과 MSG
     */
    @Mutation(() => ResultMessage)
    async deleteProductAll(): Promise<ResultMessage> {
        return await this.productService.deleteAll();
    }

    /**
     * 모든 상품 삭제 ( 삭제 X )
     * @returns 결과 MSG
     */
    @Mutation(() => ResultMessage)
    async softDeleteProductAll(): Promise<ResultMessage> {
        return await this.productService.softDeleteAll();
    }

    /**
     * 단일 상품 삭제 ( 삭제 O )
     * @param productID
     * @returns 결과 MSG
     */
    @Mutation(() => ResultMessage)
    async deleteProduct(
        @Args('productID') productID: string, //
    ): Promise<ResultMessage> {
        return await this.productService.delete(productID);
    }

    /**
     * 단일 상품 삭제 ( 삭제 X )
     * @param productID
     * @returns 결과 MSG
     */
    @Mutation(() => ResultMessage)
    async softDeleteProduct(
        @Args('productID') productID: string, //
    ): Promise<ResultMessage> {
        return await this.productService.softDelete(productID);
    }
}
