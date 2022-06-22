import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from '../dto/createProduct.input';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductAdminRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    private readonly _selector = [
        'product.id',
        'product.name',
        'product.url',
        'product.stock_count',
        'product.selling_count',
        'product.price',
        'book.id',
        'book.title',
        'category.id',
        'category.name',
        'product.createAt',
        'product.updateAt',
    ];

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository
            .createQueryBuilder('product')
            .select(this._selector)
            .withDeleted()
            .leftJoin('product.book', 'book')
            .leftJoin('product.productCategory', 'category')
            .orderBy('product.createAt')
            .getMany();
    }

    async findAllName(): Promise<ProductEntity[]> {
        return await this.productRepository
            .createQueryBuilder('product')
            .select(['product.id', 'product.name'])
            .orderBy('product.createAt')
            .getMany();
    }

    async findOne(
        productID: string, //
    ): Promise<ProductEntity> {
        return await this.productRepository
            .createQueryBuilder('product')
            .select([
                ...this._selector,
                'tag.id',
                'tag.name',
                'product.deleteAt',
            ])
            .withDeleted()
            .where('product.id=:id', { id: productID })
            .leftJoin('product.book', 'book')
            .leftJoin('product.productCategory', 'category')
            .leftJoin('product.productTags', 'tag')
            .orderBy('product.createAt')
            .getOne();
    }
}
