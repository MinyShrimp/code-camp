import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
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

    @Get('/product-category/names')
    findAllName(): Promise<ProductCategoryEntity[]> {
        return this.productCategoryAdminService.findAllName();
    }

    @Get('/product-category/:id')
    findOne(
        @Param('id') categoryID: string, //
    ): Promise<ProductCategoryEntity> {
        return this.productCategoryAdminService.findOne(categoryID);
    }

    @Post('/product-category')
    createCategory(
        @Req() req: Request, //
    ) {
        return this.productCategoryService.createTree(req.body);
    }
}
