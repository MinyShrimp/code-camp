import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProductTagEntity from './entities/productTag.entity';

@Injectable()
export default class ProductTagService {
    constructor(
        @InjectRepository(ProductTagEntity)
        private readonly productTagRepository: Repository<ProductTagEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 이름 기반 단일 조회
     * @param name
     * @returns 조회된 결과
     */
    private async __findOneByName(
        name: string, //
    ): Promise<ProductTagEntity> {
        return await this.productTagRepository.findOne({ name: name });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 태그 생성
     * @param tags ["#전자제품", "#영등포", "#컴퓨터"]
     *
     * 있는지 없는지 검사해서
     * 없으면 새로 생성, 있으면 있던거 그대로
     */
    async create(
        tags: string[], //
    ) {
        const tagNames = tags.map((tag) => tag.replace('#', ''));
        const tagEntities: Array<ProductTagEntity> = tagNames.reduce(
            (result, tag) => {
                this.__findOneByName(tag).then(async (res) => {
                    if (res) {
                        result.push(res);
                    } else {
                        result.push(
                            await this.productTagRepository.save({
                                name: tag,
                            }),
                        );
                    }
                });
                return result;
            },
            [],
        );

        return tagEntities;
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    ///////////////////////////////////////////////////////////////////
    // 삭제 //
}
