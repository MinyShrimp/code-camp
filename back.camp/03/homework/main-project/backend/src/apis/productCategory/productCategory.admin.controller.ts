import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateProductCategoryInput } from './dto/createProductCategory.input';
import { ProductCategoryAdminRepository } from './entities/productCategory.admin.repository';
import { ProductCategoryEntity } from './entities/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Controller('admin')
export class ProductCategoryAdminController {
    constructor(
        private readonly productCategoryService: ProductCategoryService, //
        private readonly productCategoryAdminRepository: ProductCategoryAdminRepository,
    ) {}

    @Get('/product-categorys')
    findAll(): Promise<ProductCategoryEntity[]> {
        return this.productCategoryAdminRepository.findAll();
    }

    @Get('/product-category/names')
    findAllName(): Promise<ProductCategoryEntity[]> {
        return this.productCategoryAdminRepository.findAllName();
    }

    @Get('/product-category/:id')
    findOne(
        @Param('id') categoryID: string, //
    ): Promise<ProductCategoryEntity> {
        return this.productCategoryAdminRepository.findOne(categoryID);
    }

    @Post('/product-category')
    createCategory(
        @Body() input: CreateProductCategoryInput, //
    ) {
        return this.productCategoryService.createTree(input);
    }

    @Delete('/product-categorys')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ) {
        await this.productCategoryAdminRepository.bulkDelete(IDs);
        return 'delete ok';
    }
}
