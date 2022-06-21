import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ElasticsearchService } from "@nestjs/elasticsearch";

import ProductEntity from "./entities/product.entity";

import CreateProductInput from "./dto/createProduct.input";
import UpdateProductInput from "./dto/updateProduct.input";

import ProductService from "./Product.service";

@Resolver()
export default class ProductResolver {
    constructor(
        private readonly productService: ProductService, //
        private readonly elasticSearchService: ElasticsearchService
    ) {}

    // GET 모든 상품
    @Query(() => [ProductEntity])
    fetchProducts(): Promise<ProductEntity[]> {
        return this.productService.findAll();
    }

    @Query(() => [ProductEntity])
    async searchProducts(
        @Args({ name: "search", nullable: true }) search: string //
    ): Promise<ProductEntity[]> {
        const ela = await this.elasticSearchService.search({
            index: "class",
            query: {
                match: {
                    description: search,
                },
            },
        });

        console.log(ela.hits.hits);

        return this.productService.findAll();
    }

    // GET 단일 상품
    @Query(() => ProductEntity)
    async fetchProduct(
        @Args("productID") productID: string //
    ): Promise<ProductEntity> {
        const product = await this.productService.findOne(productID);

        const ela = await this.elasticSearchService.search({
            index: "class",
            query: {
                match: {
                    name: "상품",
                },
            },
        });

        console.log(JSON.stringify(ela, null, " "));

        return product;
    }

    // POST 상품 생성
    @Mutation(() => ProductEntity)
    async createProduct(
        @Args("createProductInput") createProductInput: CreateProductInput
    ): Promise<ProductEntity> {
        const product = await this.productService.create(createProductInput);

        // 엘라스틱 서치에 등록하기
        this.elasticSearchService.create({
            id: product.id,
            index: "product",
            document: {
                ...product,
            },
        });

        return product;
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
