/* Product Service */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';
import { MESSAGES } from '../../commons/message/Message.enum';

import { BookService } from '../book/book.service';
import { ProductTagService } from '../productTag/productTag.service';
import { ProductCategorySearchService } from '../productCategorySearch/productCategorySearch.service';

import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { ProductCheckService } from './productCheck.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly productCheckService: ProductCheckService,
        private readonly bookService: BookService,
        private readonly productTagsService: ProductTagService,
        private readonly productCategoryService: ProductCategorySearchService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 상품 조회
     * @returns 모든 상품 목록
     */
    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            relations: ['book', 'productCategory', 'productTags'],
        });
    }

    /**
     * 삭제된 데이터를 포함한 모든 상품 조회
     * @returns 삭제된 데이터를 포함한 모든 상품 목록
     */
    async findAllWithDeleted(): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            relations: ['book', 'productCategory', 'productTags'],
            withDeleted: true,
        });
    }

    /**
     * 단일 상품 조회
     * @param productID
     * @returns 단일 상품
     */
    async findOneByID(
        productID: string, //
    ): Promise<ProductEntity> {
        return await this.productRepository.findOne({
            where: { id: productID },
            relations: ['book', 'productCategory', 'productTags'],
        });
    }

    /**
     * 삭제된 데이터를 포함한 단일 상품 조회
     * @param productID
     * @returns 삭제된 데이터를 포함한 단일 상품
     */
    async findOneWithDeleted(
        productID: string, //
    ): Promise<ProductEntity> {
        return await this.productRepository.findOne({
            where: { id: productID },
            relations: ['book', 'productCategory', 'productTags'],
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
        const {
            book_id, //
            category_id,
            product_tags,
            ...product
        } = createProductInput;

        const book = await this.bookService.findOne(book_id);
        const category = await this.productCategoryService.findOneByID(
            category_id,
        );
        const tagEntities = await this.productTagsService.create(product_tags);

        return await this.productRepository.save({
            ...product,
            book: book,
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
        const product = await this.findOneByID(productID);

        // 존재 여부 검사
        this.productCheckService.checkValidProduct(product);

        // 재고 소진 검사
        this.productCheckService.checkSoldout(product);

        // input data 뽑기
        const {
            book_id, //
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

        // 저장 후 변경된 데이터 반환
        return await this.productRepository.save({
            ...product,
            id: productID,
            ...input,
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

        const result = await this.productRepository.restore({
            id: product.id,
        });

        return new ResultMessage({
            id: productID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? MESSAGES.PRODUCT_RESTORE_SUCCESSED
                : MESSAGES.PRODUCT_RESTORE_FAILED,
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
                ? MESSAGES.PRODUCT_DELETE_ALL_SUCCESSED
                : MESSAGES.PRODUCT_DELETE_ALL_FAILED,
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
                ? MESSAGES.PRODUCT_SOFT_DELETE_ALL_SUCCESSED
                : MESSAGES.PRODUCT_SOFT_DELETE_ALL_FAILED,
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

        const result = await this.productRepository.delete({
            id: product.id,
        });

        return new ResultMessage({
            id: productID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? MESSAGES.PRODUCT_DELETE_SUCCESSED
                : MESSAGES.PRODUCT_DELETE_FAILED,
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
        const product = await this.findOneByID(productID);

        const result = await this.productRepository.softDelete({
            id: product.id,
        });

        return new ResultMessage({
            id: productID,
            isSuccess: result.affected ? true : false,
            contents: result.affected
                ? MESSAGES.PRODUCT_SOFT_DELETE_SUCCESSED
                : MESSAGES.PRODUCT_SOFT_DELETE_FAILED,
        });
    }
}
