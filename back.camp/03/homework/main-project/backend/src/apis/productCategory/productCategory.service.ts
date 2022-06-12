import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, TreeRepository } from 'typeorm';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';

import { CreateProductCategoryInput } from './dto/createProductCategory.input';
import { ProductCategoryEntity } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectEntityManager()
        private readonly manger: EntityManager,
    ) // @InjectRepository(ProductCategoryEntity)
    // private readonly productCategoryRepository: TreeRepository<ProductCategoryEntity>,
    {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * Category Tree 전체 조회
     * @returns 조회된 전체 분류
     */
    async findAllByTree(): Promise<ProductCategoryEntity[]> {
        const manager = this.manger.getTreeRepository(ProductCategoryEntity);
        return await manager.findTrees();
    }

    /**
     * Category Tree 단일 조회
     * @param categoryID
     * @returns 조회된 단일 분류
     */
    async findByTree(
        categoryID: string, //
    ): Promise<ProductCategoryEntity> {
        const manager = this.manger.getTreeRepository(ProductCategoryEntity);

        const parent = await manager.findOne({
            where: { id: categoryID },
        });

        return await manager.findDescendantsTree(parent);
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
            const manager = this.manger.getTreeRepository(
                ProductCategoryEntity,
            );

            if (!input.parentID) {
                return await manager.save({
                    name: input.name,
                });
            } else {
                const parent = await manager.findOne({
                    where: { id: input.parentID },
                });

                const child = manager.create({
                    name: input.name,
                    parent: parent,
                });
                return await manager.save(child);
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
        const manager = this.manger.getTreeRepository(ProductCategoryEntity);

        const result = await manager.delete({
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
        const manager = this.manger.getTreeRepository(ProductCategoryEntity);

        await manager.update({}, { parent: null });
        const result = await manager.delete({});
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? MESSAGES.CATEGORY_TREE_DELETE_ALL_SUCCESSED
                : MESSAGES.CATEGORY_TREE_DELETE_ALL_FAILED,
        });
    }
}
