/* Product Service */

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ProductPriceEntity from './entities/productPrice.entity';

@Injectable()
export default class ProductPriceService {
    constructor(
        @InjectRepository(ProductPriceEntity)
        private readonly productPriceRepository: Repository<ProductPriceEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 가격 생성
     * @param price 가격
     * @returns 생성된 Price Entity
     *
     * To. Product Service - Create
     */
    async create(price: number): Promise<ProductPriceEntity> {
        return await this.productPriceRepository.save({
            price,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 가격 수정
     * @param priceID 가격 ID
     * @param price   가격
     * @returns 수정된 Price Entity
     *
     * To. Product Service - Update
     */
    async update(priceID: string, price: number): Promise<ProductPriceEntity> {
        return await this.productPriceRepository.save({
            id: priceID,
            price: price,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
