/* Product Service */

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

import ProductTagService from '../productTag/productTag.service';
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
        private readonly productTagsService: ProductTagService,
        private readonly productPriceService: ProductPriceService,
        private readonly productCategoryService: ProductCategorySearchService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    /**
     * 재고 소진 체크
     * @param productID
     */
    private async __checkSoldout(
        product: ProductEntity, //
    ): Promise<boolean> {
        if (product.stock_count <= 0) {
            throw new UnprocessableEntityException(
                '이미 판매 완료된 상품입니다.',
            );
        }
        return true;
    }

    /**
     * 상품 존재 검사
     * @param product
     * @returns 존재 여부
     *
     *  - 없으면 UnprocessableEntityException
     */
    private __checkValidProduct(
        product: ProductEntity, //
    ): boolean {
        if (product === undefined) {
            throw new UnprocessableEntityException('Unvalid Product ID');
        }
        return true;
    }

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 상품 조회
     * @returns 모든 상품 목록
     */
    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            relations: ['book', 'price', 'productCategory', 'productTags'],
        });
    }

    /**
     * 삭제된 데이터를 포함한 모든 상품 조회
     * @returns 삭제된 데이터를 포함한 모든 상품 목록
     */
    async findAllWithDeleted(): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            relations: ['book', 'price', 'productCategory', 'productTags'],
            withDeleted: true,
        });
    }

    /**
     * 단일 상품 조회
     * @param productID
     * @returns 단일 상품
     */
    async findOne(
        productID: string, //
    ): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: { id: productID },
            relations: ['book', 'price', 'productCategory', 'productTags'],
        });
        this.__checkValidProduct(product);
        return product;
    }

    /**
     * 삭제된 데이터를 포함한 단일 상품 조회
     * @param productID
     * @returns 삭제된 데이터를 포함한 단일 상품
     */
    async findOneWithDeleted(
        productID: string, //
    ): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: { id: productID },
            relations: ['book', 'price', 'productCategory', 'productTags'],
            withDeleted: true,
        });
        this.__checkValidProduct(product);
        return product;
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
        const {
            price, //
            category_id,
            product_tags,
            ...product
        } = createProductInput;

        const category = await this.productCategoryService.findOneByID(
            category_id,
        );
        const priceEntity = await this.productPriceService.create(price);
        const tagEntities = await this.productTagsService.create(product_tags);

        return await this.productRepository.save({
            ...product,
            price: priceEntity,
            productCategory: category,
            productTags: tagEntities,
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
        // 상품 검색
        const product = await this.findOne(productID);

        // 존재 여부 검사
        this.__checkValidProduct(product);

        // 재고 소진 검사
        await this.__checkSoldout(product);

        // input data 뽑기
        const {
            price, //
            category_id,
            product_tags,
            ...input
        } = updateProductInput;

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
    async restore(
        productID: string, //
    ): Promise<ResultMessage> {
        const product = await this.findOneWithDeleted(productID);

        await this.productPriceService.restore(product.price.id);
        const result = await this.productRepository.restore({
            id: product.id,
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
        await this.productPriceService.deleteAll();
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
        await this.productPriceService.softDeleteAll();
        const result = await this.productRepository.softDelete({});

        return new ResultMessage({
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? `Completed All Product Soft Delete`
                : `Failed All Product Soft Delete`,
        });
    }

    /**
     * 단일 상품 삭제 ( 삭제 O )
     * @param productID
     * @returns ResultMessage
     */
    async delete(
        productID: string, //
    ): Promise<ResultMessage> {
        const product = await this.findOneWithDeleted(productID);

        await this.productPriceService.delete(product.price.id);
        const result = await this.productRepository.delete({
            id: product.id,
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
    async softDelete(
        productID: string, //
    ): Promise<ResultMessage> {
        const product = await this.findOne(productID);

        await this.productPriceService.softDelete(product.price.id);
        const result = await this.productRepository.softDelete({
            id: product.id,
        });

        return new ResultMessage({
            id: productID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? `Completed Product Soft Delete`
                : `Failed Product Soft Delete`,
        });
    }
}
