import { Controller, Get, Param } from '@nestjs/common';
import { ProductCategorySearchService } from './productCategorySearch.service';

@Controller('admin')
export class ProductCategorySearchAdminController {
    constructor(
        private readonly productCategorySearchSerivce: ProductCategorySearchService,
    ) {}

    @Get('/product-category-searchs')
    findAll() {
        return this.productCategorySearchSerivce.findAll();
    }

    @Get('/product-category-search/:id')
    findOne(
        @Param('id') searchID: string, //
    ) {
        return this.productCategorySearchSerivce.findOneByID(searchID);
    }
}
