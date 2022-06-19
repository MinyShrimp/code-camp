import { Controller, Get, Param } from '@nestjs/common';
import { ProductCategoryService } from './productCategory.service';

@Controller('admin')
export class ProductCategoryAdminController {
    constructor(
        private readonly productCategoryService: ProductCategoryService, //
    ) {}

    @Get('/product-categorys')
    findAll() {
        return this.productCategoryService.findAllByTree();
    }

    @Get('/product-category/:id')
    findOne(
        @Param('id') categoryID: string, //
    ) {
        return this.productCategoryService.findByTree(categoryID);
    }
}
