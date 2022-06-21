import { Controller, Get, Param } from '@nestjs/common';
import { ProductCategoryEntity } from './entities/productCategory.entity';
import { ProductCategoryAdminService } from './productCategory.admin.service';
import { ProductCategoryService } from './productCategory.service';

@Controller('admin')
export class ProductCategoryAdminController {
    constructor(
        private readonly productCategoryService: ProductCategoryService, //
        private readonly productCategoryAdminService: ProductCategoryAdminService,
    ) {}

    @Get('/product-categorys')
    findAll(): Promise<ProductCategoryEntity[]> {
        return this.productCategoryAdminService.findAll();
    }

    @Get('/product-category/:id')
    findOne(
        @Param('id') categoryID: string, //
    ): Promise<ProductCategoryEntity> {
        return this.productCategoryAdminService.findOne(categoryID);
    }
}
