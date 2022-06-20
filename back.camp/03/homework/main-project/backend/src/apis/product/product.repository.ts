import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';

// @EntityRepository(ProductEntity)
// export class ProductRepository extends Repository<ProductEntity> {
//     findAll = async (): Promise<ProductEntity[]> => {
//         console.log(this);
//         return await this.find({
//             relations: ['book', 'productCategory', 'productTags'],
//         });
//     };
// }

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>, //
    ) {}

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
     * 묶음 상품 조회
     * @returns 모든 상품 목록
     */
    async findAllByIds(
        ids: string[], //
    ): Promise<ProductEntity[]> {
        return (
            await Promise.all<ProductEntity>(
                ids.map((id) => {
                    return new Promise((resolve, reject) => {
                        this.productRepository
                            .findOne({
                                where: { id: id },
                                relations: [
                                    'book',
                                    'productCategory',
                                    'productTags',
                                ],
                            })
                            .then((res) => resolve(res))
                            .catch((error) => reject(error));
                    });
                }),
            )
        ).filter((v) => v !== undefined);
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

    /**
     * 상품 생성
     * @param product
     * @returns 생성된 상품 정보
     */
    async save(
        product: Partial<ProductEntity>, //
    ): Promise<ProductEntity> {
        return await this.productRepository.save(product);
    }

    /**
     * 삭제 취소
     * @param productID
     * @returns
     */
    async retoreByID(
        productID: string, //
    ): Promise<boolean> {
        return (
            await this.productRepository.restore({
                id: productID,
            })
        ).affected
            ? true
            : false;
    }

    /**
     * 모든 상품 삭제 ( 삭제 O )
     */
    async deleteAll(): Promise<boolean> {
        return (await this.productRepository.delete({})).affected
            ? true
            : false;
    }

    /**
     * 모든 상품 삭제 ( 삭제 X )
     * @returns ResultMessage
     */
    async softDeleteAll(): Promise<boolean> {
        return (await this.productRepository.softDelete({})).affected
            ? true
            : false;
    }

    /**
     * 단일 상품 삭제 ( 삭제 O )
     * @param productID
     * @returns ResultMessage
     */
    async delete(
        productID: string, //
    ): Promise<boolean> {
        return (
            await this.productRepository.delete({
                id: productID,
            })
        ).affected
            ? true
            : false;
    }

    /**
     * 단일 상품 삭제 ( 삭제 X )
     * @param productID
     * @returns ResultMessage
     */
    async softDelete(
        productID: string, //
    ): Promise<boolean> {
        return (
            await this.productRepository.softDelete({
                id: productID,
            })
        ).affected
            ? true
            : false;
    }
}
