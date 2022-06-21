import { Injectable } from '@nestjs/common';
import { ProductCategoryAdminRepository } from './entities/productCategory.admin.repository';
import { ProductCategoryEntity } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryAdminService {
    constructor(
        private readonly productCategoryRepository: ProductCategoryAdminRepository,
    ) {}

    async findAll(): Promise<ProductCategoryEntity[]> {
        return await this.productCategoryRepository.findAll();
    }

    async findOne(
        categoryID: string, //
    ): Promise<ProductCategoryEntity> {
        return await this.productCategoryRepository.findOne(categoryID);
    }
}
