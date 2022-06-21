import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductEntity } from './entities/product.entity';
import { ProductAdminService } from './product.admin.service';
import { ProductService } from './product.service';

@Controller('admin')
export class ProductAdminController {
    constructor(
        private readonly productService: ProductService,
        private readonly productAdminService: ProductAdminService, //
    ) {}

    /**
     * GET /admin/products
     * @response 삭제된 데이터를 포함한 모든 상품 목록
     */
    @Get('/products')
    findAll(): Promise<ProductEntity[]> {
        return this.productAdminService.findAll();
    }

    /**
     * GET /admin/product/:id
     * @param productID
     * @response 삭제된 데이터를 포함한 단일 상품
     */
    @Get('/product/:id')
    findOne(
        @Param('id') productID: string, //
    ): Promise<ProductEntity> {
        return this.productAdminService.findOne(productID);
    }

    /**
     * POST /api/product
     * @param req
     * @returns 생성된 상품 정보
     */
    @Post('/product')
    async createProduct(
        @Req() req: Request, //
    ): Promise<ProductEntity> {
        console.log(req.body);
        return this.productAdminService.findOne('');
        // const product = this.productService.create(req.body);
        // return product;
    }

    /**
     * DELETE /admin/products
     * @response ResultMessage
     */

    /**
     * DELETE /admin/product/:id
     * @param productID
     * @response ResultMessage
     */
}
