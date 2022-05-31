import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import ProductCategoryEntity from "./entities/productCategory.entity";

@Injectable()
export default class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategoryEntity)
        private readonly productCategoryRepository: Repository<ProductCategoryEntity>
    ) {}

    async findAll(): Promise<ProductCategoryEntity[]> {
        return await this.productCategoryRepository.find({});
    }

    async create(name: string): Promise<ProductCategoryEntity> {
        const entity = new ProductCategoryEntity();
        entity.name = name;
        await this.productCategoryRepository.save(entity);
        return entity;
    }

    async deleteAll() {
        await this.productCategoryRepository.delete({});
    }
}
