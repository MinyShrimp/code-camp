import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateProductCategoryInput from './dto/createProductCategory.input';
import ProductCategoryEntity from './entities/productCategory.entity';
import ProductCategorySearchEntity from './entities/productCategorySearch.entity';

@Injectable()
export default class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategoryEntity)
        private readonly productCategoryRepository: Repository<ProductCategoryEntity>,
        @InjectRepository(ProductCategorySearchEntity)
        private readonly productCategorySearchRepository: Repository<ProductCategorySearchEntity>,
    ) {}

    // 카테고리 생성
    async create(
        input: CreateProductCategoryInput, //
    ): Promise<ProductCategorySearchEntity> {
        try {
            if (!input.parentID) {
                await this.productCategoryRepository.save({
                    name: input.name,
                });

                return await this.productCategorySearchRepository.save({
                    name: input.name,
                });
            } else {
                const parent = await this.productCategoryRepository.findOne(
                    input.parentID,
                );
                const child = this.productCategoryRepository.create({
                    name: input.name,
                    parent: parent,
                });
                return await this.productCategoryRepository.save(child);
            }
        } catch (e) {
            throw e;
        }
    }

    // 전체 삭제
    async deleteAll() {
        this.productCategorySearchRepository.delete({});
        this.productCategoryRepository.update({}, { parent: null });
        this.productCategoryRepository.delete({});
    }
}
