import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ProductEntity from './entities/product.entity';

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({});
    }
}
