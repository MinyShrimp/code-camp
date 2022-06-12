import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';

import { ProductCategoryService } from '../productCategory/productCategory.service';
import { ProductCategorySearchDto } from './dto/productCategorySearch.dto';
import { ProductCategorySearchEntity } from './entities/productCategorySearch.entity';

@Injectable()
export class ProductCategorySearchService {
    constructor(
        @InjectRepository(ProductCategorySearchEntity)
        private readonly productCategorySearchRepository: Repository<ProductCategorySearchEntity>,
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    /**
     * 카테고리 존재 검사
     * @param category
     * @returns 존재 여부
     *
     *  - 없으면 UnprocessableEntityException
     */
    private __checkValidCategory(
        category: ProductCategorySearchEntity,
    ): boolean {
        if (category === undefined) {
            throw new UnprocessableEntityException(
                MESSAGES.CATEGORY_SEARCH_FIND_ONE_FAILED,
            );
        }

        return true;
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * ID 기반 조회
     * @param categoryID
     * @returns 조회된 분류 Entity
     */
    private async __findOneByID(
        categoryID: string,
    ): Promise<ProductCategorySearchEntity> {
        return await this.productCategorySearchRepository.findOne({
            where: { id: categoryID },
        });
    }

    /**
     * 이름 기반 조회
     * @param name
     * @returns 조회된 분류 Entity
     */
    private async __findOneByName(
        name: string,
    ): Promise<ProductCategorySearchEntity> {
        return await this.productCategorySearchRepository.findOne({
            where: { name: name },
        });
    }

    /**
     * Search Category 전체 조회
     * @returns 조회된 분류 Entities
     */
    async findAll(): Promise<ProductCategorySearchEntity[]> {
        return await this.productCategorySearchRepository.find({});
    }

    /**
     * Search Category ID 기반 단일 조회
     * @param categoryID
     * @returns 조회된 분류 Entity
     *
     * 카테고리 존재 검사
     *  - 없으면 UnprocessableEntityException
     */
    async findOneByID(
        categoryID: string, //
    ): Promise<ProductCategorySearchEntity> {
        const category = await this.__findOneByID(categoryID);
        this.__checkValidCategory(category);
        return category;
    }

    /**
     * 이름 기반 단일 조회
     * @param name
     * @returns 조회된 분류 Entity
     *
     * 카테고리 존재 검사
     *  - 없으면 UnprocessableEntityException
     */
    async findOneByName(
        name: string, //
    ): Promise<ProductCategorySearchEntity> {
        const category = await this.__findOneByName(name);
        this.__checkValidCategory(category);
        return category;
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * Search Category 생성
     * @param productCategorySearchDTO
     * @returns 생성된 분류 Entity
     */
    private async __createSearchCategory(
        productCategorySearchDTO: ProductCategorySearchDto,
    ): Promise<ProductCategorySearchEntity> {
        return await this.productCategorySearchRepository.save({
            ...productCategorySearchDTO,
        });
    }

    /**
     * Search Category 생성
     * @returns ResultMessage
     */
    async createSarchCategory(): Promise<ResultMessage> {
        // await this.__deleteAllSearchCategory();

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

        return new ResultMessage({
            contents: MESSAGES.CATEGORY_SEARCH_CREATE,
            isSuccess: true,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * Search Category 전체 삭제
     */
    private async __deleteAllSearchCategory(): Promise<void> {
        await this.productCategorySearchRepository.softDelete({});
    }
}
