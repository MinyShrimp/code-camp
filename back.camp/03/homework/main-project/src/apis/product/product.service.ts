/* Product Service */

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import ProductPriceService from '../productPrice/productPrice.service';

import ProductCategorySearchService from '../productCategorySearch/productCategorySearch.service';

import ProductEntity from './entities/product.entity';
import CreateProductInput from './dto/createProduct.input';
import UpdateProductInput from './dto/updateProduct.input';

@Injectable()
export default class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly productPriceService: ProductPriceService,
        private readonly productCategoryService: ProductCategorySearchService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    /**
     * 재고 소진 체크
     * @param productID
     */
    async checkSoldout(productID: string): Promise<void> {
        const product = await this.findOne(productID);
        if (product.stock_count <= 0) {
            throw new UnprocessableEntityException(
                '이미 판매 완료된 상품입니다.',
            );
        }
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 상품 조회
     * @returns 모든 상품 목록
     */
    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            relations: ['book', 'price', 'productCategory'],
        });
    }

    /**
     * 삭제된 데이터를 포함한 모든 상품 조회
     * @returns 삭제된 데이터를 포함한 모든 상품 목록
     */
    async findAllWithDeleted(): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            relations: ['book', 'price', 'productCategory'],
            withDeleted: true,
        });
    }

    /**
     * 단일 상품 조회
     * @param productID
     * @returns 단일 상품
     */
    async findOne(productID: string): Promise<ProductEntity> {
        return await this.productRepository.findOne({
            where: { id: productID },
            relations: ['book', 'price', 'productCategory'],
        });
    }

    /**
     * 삭제된 데이터를 포함한 단일 상품 조회
     * @param productID
     * @returns 삭제된 데이터를 포함한 단일 상품
     */
    async findOneWithDeleted(productID: string): Promise<ProductEntity> {
        return await this.productRepository.findOne({
            where: { id: productID },
            relations: ['book', 'price', 'productCategory'],
            withDeleted: true,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 상품 생성
     * @param createProductInput
     * @returns 생성된 상품 정보
     */
    async create(
        createProductInput: CreateProductInput,
    ): Promise<ProductEntity> {
        const { price, category_id, ...product } = createProductInput;

        const category = await this.productCategoryService.findOneByID(
            category_id,
        );
        const priceEntity = await this.productPriceService.create(price);

        return await this.productRepository.save({
            ...product,
            price: priceEntity,
            productCategory: category,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 상품 정보 수정
     * @param productID
     * @param updateProductInput
     * @returns 수정된 상품 정보
     */
    async update(
        productID: string,
        updateProductInput: UpdateProductInput,
    ): Promise<ProductEntity> {
        // stock_count <= 0 검사
        await this.checkSoldout(productID);

        // 상품 검색
        const product = await this.findOne(productID);
        // input data 뽑기
        const { price, category_id, ...input } = updateProductInput;

        // 새로운 카테고리 찾기
        // 입력받지 않았다면, 기존의 카테고리 복사
        const category =
            category_id !== undefined
                ? await this.productCategoryService.findOneByID(category_id)
                : product.productCategory;

        // 가격 업데이트
        const priceEntity = await this.productPriceService.update(
            product.price.id,
            price,
        );

        // 저장 후 변경된 데이터 반환
        return await this.productRepository.save({
            ...product,
            id: productID,
            ...input,
            price: priceEntity,
            productCategory: category,
        });
    }

    /**
     * Soft Delete된 상품 되살리기
     * @param productID
     * @returns ResultMessage
     */
    async restore(productID: string): Promise<ResultMessage> {
        const result = await this.productRepository.restore({
            id: productID,
        });

        return new ResultMessage({
            id: productID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? 'Completed Product Restore'
                : 'Failed Product Restore',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 모든 상품 삭제 ( 삭제 O )
     * @returns ResultMessage
     */
    async deleteAll(): Promise<ResultMessage> {
        const result = await this.productRepository.delete({});

        return new ResultMessage({
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? `Completed All Product Delete`
                : `Failed All Product Delete`,
        });
    }

    /**
     * 모든 상품 삭제 ( 삭제 X )
     * @returns ResultMessage
     */
    async softDeleteAll(): Promise<ResultMessage> {
        const result = await this.productRepository.softDelete({});

        return new ResultMessage({
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? `Completed All Product Delete`
                : `Failed All Product Delete`,
        });
    }

    /**
     * 단일 상품 삭제 ( 삭제 O )
     * @param productID
     * @returns ResultMessage
     */
    async delete(productID: string): Promise<ResultMessage> {
        const result = await this.productRepository.delete({
            id: productID,
        });

        return new ResultMessage({
            id: productID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? `Completed Product Delete`
                : `Failed Product Delete`,
        });
    }

    /**
     * 단일 상품 삭제 ( 삭제 X )
     * @param productID
     * @returns ResultMessage
     */
    async softDelete(productID: string): Promise<ResultMessage> {
        const result = await this.productRepository.softDelete({
            id: productID,
        });

        return new ResultMessage({
            id: productID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? `Completed Product Delete`
                : `Failed Product Delete`,
        });
    }
}
