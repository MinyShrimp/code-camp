import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ProductCategoryService from '../productCategory/productCategory.service';

import CreateProductCategorySearchDto from './dto/createProductCategorySearch.dto';
import ProductCategorySearchEntity from './entities/productCategorySearch.entity';

@Injectable()
export default class ProductCategorySearchService {
    constructor(
        @InjectRepository(ProductCategorySearchEntity)
        private readonly productCategorySearchRepository: Repository<ProductCategorySearchEntity>,
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    // Search Category 전체 조회
    async findAllBySearch(): Promise<ProductCategorySearchEntity[]> {
        return await this.productCategorySearchRepository.find({});
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

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

        const tree = await this.productCategoryService.findAllByTree();
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

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    // Search Category 전체 삭제
    private async __deleteAllSearchCategory(): Promise<void> {
        await this.productCategorySearchRepository.delete({});
    }
}
