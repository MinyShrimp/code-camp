import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import CreateProductInput from "./dto/createProduct.input";
import ProductEntity from "./entities/product.entity";
import ProductService from "./Product.service";

@Resolver()
export default class ProductResolver {
    constructor(
        private readonly productService: ProductService //
    ) {}

    @Query(() => [ProductEntity])
    fetchProductAll() {
        return this.productService.findAll();
    }

    @Mutation(() => ProductEntity)
    createProduct(
        @Args("createProductInput") createProductInput: CreateProductInput
    ): Promise<ProductEntity> {
        return this.productService.create(createProductInput);
    }

    @Mutation(() => String)
    deleteProductAll() {
        this.productService.deleteAll();
        return "ok";
    }
}
