import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ResultMessage from 'src/commons/dto/ResultMessage.dto';
import { getManager, Repository } from 'typeorm';

import ProductCategorySearchService from '../productCategorySearch/productCategorySearch.service';

import CreateProductCategoryInput from './dto/createProductCategory.input';
import FetchProductCategoryOutput from './dto/fetchProductCategory.output';

import ProductCategoryEntity from './entities/productCategory.entity';

@Injectable()
export default class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategoryEntity)
        private readonly productCategoryRepository: Repository<ProductCategoryEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    // Category Tree 전체 조회
    async findAllByTree(): Promise<FetchProductCategoryOutput[]> {
        const manager = getManager();
        return await manager
            .getTreeRepository(ProductCategoryEntity)
            .findTrees();
    }

    // Category Tree 단일 조회
    async findByTree(
        categoryID: string, //
    ): Promise<FetchProductCategoryOutput> {
        const parent = await this.productCategoryRepository.findOne({
            id: categoryID,
        });
        const manager = getManager();
        return await manager
            .getTreeRepository(ProductCategoryEntity)
            .findDescendantsTree(parent);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    // Category Tree 생성
    async createTree(
        input: CreateProductCategoryInput, //
    ): Promise<ProductCategoryEntity> {
        try {
            if (!input.parentID) {
                return await this.productCategoryRepository.save({
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

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    // Category Tree 단일 삭제
    async deleteTree(categoryID: string): Promise<ResultMessage> {
        const result = await this.productCategoryRepository.delete({
            id: categoryID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: categoryID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Category Delete'
                : 'Failed Category Delete',
        });
    }

    // Category Tree 전체 삭제
    async deleteAll(): Promise<ResultMessage> {
        await this.productCategoryRepository.update({}, { parent: null });
        const result = await this.productCategoryRepository.delete({});
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? 'Completed Category All Delete'
                : 'Failed Category All Delete',
        });
    }
}
