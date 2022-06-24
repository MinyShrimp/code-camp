import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ProductTagAdminRepository } from './entities/productTag.admin.repository';
import { ProductTagEntity } from './entities/productTag.entity';
import { ProductTagService } from './productTag.service';

@Controller('admin')
export class ProductTagAdminController {
    constructor(
        private readonly productTagService: ProductTagService, //
        private readonly productTagRepository: ProductTagAdminRepository,
    ) {}

    @Get('/product-tags')
    findAll(): Promise<ProductTagEntity[]> {
        return this.productTagRepository.findAll();
    }

    @Get('/product-tag/:id')
    findOne(
        @Param('id') productID: string, //
    ): Promise<ProductTagEntity> {
        return this.productTagRepository.findOne(productID);
    }

    @Delete('/publishers')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ) {
        await this.productTagRepository.bulkDelete(IDs);
        return 'delete ok';
    }
}
