import { Controller, Get, Param } from '@nestjs/common';
import { ProductTagEntity } from './entities/productTag.entity';
import { ProductTagService } from './productTag.service';

@Controller('admin')
export class ProductTagAdminController {
    constructor(
        private readonly productTagService: ProductTagService, //
    ) {}

    @Get('/product-tags')
    findAll(): Promise<ProductTagEntity[]> {
        return this.productTagService.findAll();
    }

    @Get('/product-tag/:id')
    findOne(
        @Param('id') productID: string, //
    ): Promise<ProductTagEntity> {
        return this.productTagService.findOne(productID);
    }
}
