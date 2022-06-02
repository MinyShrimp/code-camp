import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';

import CreateProductCategoryInput from './dto/createProductCategory.input';
import FetchProductCategoryOutput from './dto/fetchProductCategory.output';
import CreateProductCategorySearchDto from './dto/createProductCategorySearch.dto';

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

    // Search Category 전체 삭제
    private async __deleteAllSearchCategory(): Promise<void> {
        await this.productCategorySearchRepository.delete({});
    }

    // Search Category 생성
    private async __createSearchCategory(
        obj: CreateProductCategorySearchDto,
    ): Promise<string> {
        const newSearch = await this.productCategorySearchRepository.save({
            ...obj,
        });
        return newSearch.id;
    }

    // Search Category 생성
    async createSarchCategory(): Promise<ProductCategorySearchEntity[]> {
        await this.__deleteAllSearchCategory();

        const tree = await this.findAllByTree();
        tree.forEach(async (categorys1) => {
            const name = categorys1.name;
            await this.__createSearchCategory({
                name: name,
                c1: categorys1.name,
            });

            categorys1.children.forEach(async (categorys2) => {
                const name2 = name + `|${categorys2.name}`;
                await this.__createSearchCategory({
                    name: name2,
                    c1: categorys1.name,
                    c2: categorys2.name,
                });

                categorys2.children.forEach(async (categorys3) => {
                    const name3 = name2 + `|${categorys3.name}`;
                    await this.__createSearchCategory({
                        name: name3,
                        c1: categorys1.name,
                        c2: categorys2.name,
                        c3: categorys3.name,
                    });

                    categorys3.children.forEach(async (categorys4) => {
                        const name4 = name3 + `|${categorys4.name}`;
                        await this.__createSearchCategory({
                            name: name4,
                            c1: categorys1.name,
                            c2: categorys2.name,
                            c3: categorys3.name,
                            c4: categorys4.name,
                        });
                    });
                });
            });
        });

        return await this.findAllBySearch();
    }

    // Category Tree 전체 조회
    async findAllByTree(): Promise<FetchProductCategoryOutput[]> {
        const manager = getManager();
        return await manager
            .getTreeRepository(ProductCategoryEntity)
            .findTrees();
    }

    async __findByTree(categoryID: string): Promise<ProductCategoryEntity> {
        const parent = await this.productCategoryRepository.findOne({
            id: categoryID,
        });
        const manager = getManager();
        return await manager
            .getTreeRepository(ProductCategoryEntity)
            .findDescendantsTree(parent);
    }

    // Category Tree 단일 조회
    async findByTree(
        categoryID: string, //
    ): Promise<FetchProductCategoryOutput> {
        return await this.__findByTree(categoryID);
    }

    // Search Category 전체 조회
    async findAllBySearch(): Promise<ProductCategorySearchEntity[]> {
        return await this.productCategorySearchRepository.find({});
    }

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

    // Category Tree 단일 삭제
    async deleteTree(categoryID: string): Promise<void> {
        // const parent = await this.__findByTree(categoryID);
        await this.productCategoryRepository.delete({ id: categoryID });
    }

    // Category Tree 전체 삭제
    async deleteAll(): Promise<void> {
        await this.productCategoryRepository.update({}, { parent: null });
        await this.productCategoryRepository.delete({});
    }
}
