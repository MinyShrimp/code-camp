import { CACHE_MANAGER, Inject } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Cache } from "cache-manager";

import ProductEntity from "./entities/product.entity";

import CreateProductInput from "./dto/createProduct.input";
import UpdateProductInput from "./dto/updateProduct.input";

import ProductService from "./Product.service";

@Resolver()
export default class ProductResolver {
    constructor(
        private readonly productService: ProductService, //
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {}

    // GET 모든 상품
    @Query(() => [ProductEntity])
    fetchProducts(): Promise<ProductEntity[]> {
        return this.productService.findAll();
    }

    // GET 단일 상품
    @Query(() => ProductEntity)
    async fetchProduct(
        @Args("productID") productID: string //
    ): Promise<ProductEntity> {
        const productCache = await this.cacheManager.get(`product:${productID}`);
        if (productCache) {
            return productCache as ProductEntity;
        }

        const product = await this.productService.findOne(productID);
        await this.cacheManager.set(`product:${productID}`, product, { ttl: 0 });
        return product;
    }

    // POST 상품 생성
    @Mutation(() => ProductEntity)
    createProduct(
        @Args("createProductInput") createProductInput: CreateProductInput
    ): Promise<ProductEntity> {
        return this.productService.create(createProductInput);
    }

    // PATCH 상품 수정
    @Mutation(() => ProductEntity)
    async updateProduct(
        @Args("productID") productID: string,
        @Args("updateProductInput") updateProductInput: UpdateProductInput
    ): Promise<ProductEntity> {
        // 판매 완료가 되었는지 확인해보기
        await this.productService.checkSoldout(productID);
        return await this.productService.update(productID, updateProductInput);
    }

    // DELETE 상품 전체 삭제
    @Mutation(() => String)
    async deleteProductAll(): Promise<String> {
        const result = await this.productService.deleteAll();
        return result ? "ok" : "fail";
    }

    // DELETE 단일 상품 삭제
    @Mutation(() => String)
    async deleteProduct(
        @Args("productID") productID: string //
    ): Promise<String> {
        const result = this.productService.delete(productID);
        return result ? "ok" : "fail";
    }
}
