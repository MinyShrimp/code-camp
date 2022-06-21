import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';

import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';

import { ProductService } from './product.service';

/**
 * 상품 API
 */
@Resolver()
export class ProductResolver {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
        private readonly productService: ProductService, //
        private readonly elasticSearchService: ElasticsearchService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/products
     * @response 상품 검색
     */
    @Query(
        () => [ProductEntity], //
        { description: '상품 검색' },
    )
    async fetchProducts(
        @Args('search') search: string, //
    ): Promise<ProductEntity[]> {
        // Redis 검사
        const redis = await this.cacheManager.get(`product:search:${search}`);
        if (redis) {
            return redis as ProductEntity[];
        }

        // 엘라스틱에서 검색
        const ela = await this.elasticSearchService.search({
            index: 'product',
            query: {
                match_phrase: {
                    name: search,
                },
            },
            fields: ['id', 'name'],
        });

        // MySQL에서 가져오기
        const ids = ela.hits.hits.map((v) => v._source['id']);
        const result = await this.productService.findAllByIds(ids);

        // Redis 저장
        if (result.length !== 0) {
            await this.cacheManager.set(`product:search:${search}`, result, {
                ttl: 60,
            });
        }

        return result;
    }

    /**
     * GET /api/product/:id
     * @param productID
     * @response 단일 상품
     */
    @Query(
        () => ProductEntity, //
        { description: '단일 상품 조회', nullable: true },
    )
    async fetchProduct(
        @Args('productID') productID: string, //
    ): Promise<ProductEntity> {
        const redis = await this.cacheManager.get(`product:${productID}`);
        if (redis) {
            return redis as ProductEntity;
        }

        const product = await this.productService.findOneByID(productID);
        this.cacheManager.set(`product:${productID}`, product, { ttl: 0 });

        return product;
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/product
     * @param createProductInput
     * @response 생성된 상품 정보
     */
    @Mutation(
        () => ProductEntity, //
        { description: '상품 정보 생성' },
    )
    createProduct(
        @Args('createProductInput') createProductInput: CreateProductInput,
    ): Promise<ProductEntity> {
        return this.productService.create(createProductInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/product/:id
     * @param productID
     * @param updateProductInput
     * @response 수정된 상품 정보
     */
    @Mutation(
        () => ProductEntity, //
        { description: '상품 정보 수정' },
    )
    async updateProduct(
        @Args('productID') productID: string,
        @Args('updateProductInput') updateProductInput: UpdateProductInput,
    ): Promise<ProductEntity> {
        return this.productService.update(productID, updateProductInput);
    }

    /**
     * PUT /api/product/:id
     * @param productID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '상품 정보 삭제 취소' },
    )
    async restoreProduct(
        @Args('productID') productID: string,
    ): Promise<ResultMessage> {
        return await this.productService.restore(productID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /api/products/soft
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '모든 상품 삭제 ( Soft )' },
    )
    async softDeleteProductAll(): Promise<ResultMessage> {
        return await this.productService.softDeleteAll();
    }

    /**
     * DELETE /api/product/:id
     * @param productID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '단일 상품 삭제 ( Soft )' },
    )
    async softDeleteProduct(
        @Args('productID') productID: string, //
    ): Promise<ResultMessage> {
        return await this.productService.softDelete(productID);
    }
}
