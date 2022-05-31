import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateCategoryInput from './dto/createCategory.input';
import ProductCategoryEntity from './entities/productCategory.entity';

@Injectable()
export default class ProductCategoryService {
    // constructor() {}
    constructor(
        @InjectRepository(ProductCategoryEntity)
        private readonly productCategoryRepository: Repository<ProductCategoryEntity>,
    ) {}

    async findAll(): Promise<ProductCategoryEntity[]> {
        return this.productCategoryRepository.find();
    }

    // async findAll(): Promise<String[]> {
    //     return ['asd', 'aqwe'];
    // }

    async create(
        createCategoryInput: CreateCategoryInput,
    ): Promise<ProductCategoryEntity> {
        console.log(createCategoryInput);

        const entity = new ProductCategoryEntity();
        entity.name = createCategoryInput.name;

        await this.productCategoryRepository.save(entity);

        if (createCategoryInput.depth === 0) {
            entity.parent = entity;
        }

        await this.productCategoryRepository.update(entity, { parent: entity });

        return entity;
    }
}
