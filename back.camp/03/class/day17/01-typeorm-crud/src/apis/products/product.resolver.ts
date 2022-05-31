import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import CreateProductInput from "./dto/createProduct.input";
import UpdateProductInput from "./dto/updateProduct.input";
import ProductEntity from "./entities/product.entity";
import ProductService from "./Product.service";

@Resolver()
export default class ProductResolver {
    constructor(
        private readonly productService: ProductService //
    ) {}

    // GET 모든 상품
    @Query(() => [ProductEntity])
    fetchProducts(): Promise<ProductEntity[]> {
        return this.productService.findAll();
    }

    // GET 단일 상품
    @Query(() => ProductEntity)
    fetchProduct(
        @Args("productID") productID: string //
    ): Promise<ProductEntity> {
        return this.productService.findOne(productID);
    }

    // PATCH 상품 수정
    @Mutation(() => ProductEntity)
    async updateProduct(
        @Args("productID") productID: string,
        @Args("updateProductInput") updateProductInput: UpdateProductInput
    ) {
        // 판매 완료가 되었는지 확인해보기
        await this.productService.checkSoldout(productID);
        return await this.productService.update(productID, updateProductInput);
    }

    // POST 상품 생성
    @Mutation(() => ProductEntity)
    createProduct(
        @Args("createProductInput") createProductInput: CreateProductInput
    ): Promise<ProductEntity> {
        return this.productService.create(createProductInput);
    }

    // DELETE 상품 전체 삭제
    @Mutation(() => String)
    deleteProductAll() {
        this.productService.deleteAll();
        return "ok";
    }
}
