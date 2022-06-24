import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductCategoryEntity } from './productCategory.entity';

@Injectable()
export class ProductCategoryAdminRepository {
    constructor(
        @InjectRepository(ProductCategoryEntity)
        private readonly productCategoryRepository: Repository<ProductCategoryEntity>,
    ) {}

    private readonly _selector = [
        'category.id',
        'category.name',
        'category.createAt',
        'parent.id',
        'parent.name',
    ];

    async findAll(): Promise<ProductCategoryEntity[]> {
        return await this.productCategoryRepository
            .createQueryBuilder('category')
            .select(this._selector)
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
            .select(this._selector)
            .withDeleted()
            .leftJoin('category.parent', 'parent')
            .where('category.id=:id', { id: categoryID })
            .getOne();
    }

    async findAllName(): Promise<ProductCategoryEntity[]> {
        return await this.productCategoryRepository
            .createQueryBuilder('category')
            .select(['category.id', 'category.name'])
            .getMany();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) => {
                return this.productCategoryRepository.delete({ id: id });
            }),
        );
    }
}
