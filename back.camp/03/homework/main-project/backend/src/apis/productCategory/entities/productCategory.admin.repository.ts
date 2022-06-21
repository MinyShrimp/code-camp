import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductCategoryEntity } from './productCategory.entity';

@Injectable()
export class ProductCategoryAdminRepository {
    constructor(
        @InjectRepository(ProductCategoryEntity)
        private readonly productCategoryRepository: Repository<ProductCategoryEntity>,
        @InjectEntityManager()
        private readonly manager: EntityManager,
    ) {}

    async findAll(): Promise<ProductCategoryEntity[]> {
        return await this.productCategoryRepository
            .createQueryBuilder('category')
            .select([
                'category.id',
                'category.name',
                'category.createAt',
                'parent.id',
                'parent.name',
            ])
            .withDeleted()
            .leftJoin('category.parent', 'parent')
            .orderBy('category.createAt')
            .getMany();
    }

    async findOne(
        categoryID: string, //
    ): Promise<ProductCategoryEntity> {
        return await this.productCategoryRepository
            .createQueryBuilder('category')
            .select([
                'category.id',
                'category.name',
                'category.createAt',
                'parent.id',
                'parent.name',
            ])
            .withDeleted()
            .leftJoin('category.parent', 'parent')
            .where('category.id=:id', { id: categoryID })
            .getOne();
    }
}
