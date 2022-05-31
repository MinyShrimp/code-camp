import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import CreateCategoryInput from './dto/createCategory.input';
import ProductCategoryEntity from './entities/productCategory.entity';
import ProductCategoryService from './productCategory.service';

@Resolver()
export default class ProductCategoryResolver {
    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    @Query(() => [ProductCategoryEntity], { name: 'findAllCategory' })
    findAll(): Promise<ProductCategoryEntity[]> {
        return this.productCategoryService.findAll();
    }

    // @Query(() => [String], { name: 'findAllCategory' })
    // findAll(): Promise<String[]> {
    //     return this.productCategoryService.findAll();
    // }

    @Mutation(() => ProductCategoryEntity)
    createCategory(
        @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    ) {
        return this.productCategoryService.create(createCategoryInput);
    }
}
