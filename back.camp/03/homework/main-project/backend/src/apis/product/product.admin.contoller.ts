import { Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { ProductAdminRepository } from './entities/product.admin.repository';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('admin')
export class ProductAdminController {
    constructor(
        private readonly productService: ProductService,
        private readonly productAdminRepository: ProductAdminRepository,
    ) {}

    /**
     * GET /admin/products
     * @response 삭제된 데이터를 포함한 모든 상품 목록
     */
    @Get('/products')
    findAll(): Promise<ProductEntity[]> {
        return this.productAdminRepository.findAll();
    }

    /**
     * GET /admin/product/names
     * @response 삭제된 데이터를 포함한 단일 상품
     */
    @Get('/product/names')
    findAllName(): Promise<ProductEntity[]> {
        return this.productAdminRepository.findAllName();
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
        return this.productAdminRepository.findOne(productID);
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
        req.body['productTags'] = req.body['productTagsInput']
            .split('#')
            .filter((v: string) => v !== '')
            .map((v: string) => v.trim());
        console.log(req.body);
        return await this.productService.create(req.body);
    }

    /**
     * DELETE /admin/products
     * @response ResultMessage
     */
    @Delete('/products')
    async bulkDelete(
        @Req() req: Request, //
    ) {
        await this.productAdminRepository.bulkDelete(req.body);
        return 'delete ok';
    }

    /**
     * DELETE /admin/product/:id
     * @param productID
     * @response ResultMessage
     */
}
