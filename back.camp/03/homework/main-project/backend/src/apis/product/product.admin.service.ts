import { Injectable } from '@nestjs/common';
import { ProductAdminRepository } from './entities/product.admin.repository';

@Injectable()
export class ProductAdminService {
    constructor(
        private readonly productAdminRepository: ProductAdminRepository, //
    ) {}

    async findAll() {
        return await this.productAdminRepository.findAll();
    }

    async findOne(
        productID: string, //
    ) {
        return await this.productAdminRepository.findOne(productID);
    }
}
