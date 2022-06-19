import { Controller, Get, Param } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('admin')
export class ProductAdminController {
    constructor(
        private readonly productService: ProductService, //
    ) {}

    @Get('/products')
    findAll(): Promise<ProductEntity[]> {
        return this.productService.findAll();
    }

    @Get('/product/:id')
    findOne(
        @Param('id') productID: string, //
    ): Promise<ProductEntity> {
        return this.productService.findOneByID(productID);
    }
}
