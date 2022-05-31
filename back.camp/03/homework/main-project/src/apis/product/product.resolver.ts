import { Query, Resolver } from '@nestjs/graphql';
import ProductEntity from './entities/product.entity';
import ProductService from './product.service';

@Resolver()
export default class ProductResolver {
    constructor(
        private readonly productService: ProductService, //
    ) {}

    // GET 모든 상품
    @Query(() => [ProductEntity])
    fetchProducts(): Promise<ProductEntity[]> {
        return this.productService.findAll();
    }
}
