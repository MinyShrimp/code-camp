import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';

import { CreateProductCategoryInput } from './dto/createProductCategory.input';
import { ProductCategoryEntity } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategoryEntity)
        private readonly productCategoryRepository: Repository<ProductCategoryEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * Category Tree 전체 조회
     * @returns 조회된 전체 분류
     */
    async findAllByTree(): Promise<ProductCategoryEntity[]> {
        const manager = getManager();
        return await manager
            .getTreeRepository(ProductCategoryEntity)
            .findTrees();
    }

    /**
     * Category Tree 단일 조회
     * @param categoryID
     * @returns 조회된 단일 분류
     */
    async findByTree(
        categoryID: string, //
    ): Promise<ProductCategoryEntity> {
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

    /**
     * Category Tree 생성
     * @param input
     * @returns 생성된 분류 정보
     */
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

    /**
     * Category Tree 단일 삭제
     * @param categoryID
     * @returns ResultMessage
     */
    async deleteTree(categoryID: string): Promise<ResultMessage> {
        const result = await this.productCategoryRepository.delete({
            id: categoryID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: categoryID,
            isSuccess,
            contents: isSuccess
                ? MESSAGES.CATEGORY_TREE_DELETE_SUCCESSED
                : MESSAGES.CATEGORY_TREE_DELETE_FAILED,
        });
    }

    /**
     * Category Tree 전체 삭제
     * @returns ResultMessage
     */
    async deleteAll(): Promise<ResultMessage> {
        await this.productCategoryRepository.update({}, { parent: null });
        const result = await this.productCategoryRepository.delete({});
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? MESSAGES.CATEGORY_TREE_DELETE_ALL_SUCCESSED
                : MESSAGES.CATEGORY_TREE_DELETE_ALL_FAILED,
        });
    }
}
