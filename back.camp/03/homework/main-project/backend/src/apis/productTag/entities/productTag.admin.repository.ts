import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductTagEntity } from './productTag.entity';

@Injectable()
export class ProductTagAdminRepository {
    constructor(
        @InjectRepository(ProductTagEntity)
        private readonly productTagRepository: Repository<ProductTagEntity>,
    ) {}

    async findAll(): Promise<ProductTagEntity[]> {
        return await this.productTagRepository
            .createQueryBuilder('tag')
            .withDeleted()
            .select(['tag.id', 'tag.name', 'tag.createAt'])
            .getMany();
    }

    async findOne(
        productTagID: string, //
    ): Promise<ProductTagEntity> {
        return await this.productTagRepository
            .createQueryBuilder('tag')
            .withDeleted()
            .select(['tag.id', 'tag.name', 'tag.createAt'])
            .where('tag.id=:id', { id: productTagID })
            .getOne();
    }

    async bulkDelete(
        IDs: Array<string>, //
    ): Promise<DeleteResult[]> {
        return await Promise.all(
            IDs.map((id) => {
                return this.productTagRepository.delete({ id: id });
            }),
        );
    }
}
