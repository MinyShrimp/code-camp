import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewAdminRepository {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>,
    ) {}

    private readonly _selector = [
        'review.id',
        'review.contents',
        'review.star',
        'review.like',
        'review.createAt',
        'review.updateAt',
        'review.deleteAt',
        'user.id',
        'user.email',
        'product.id',
        'product.name',
    ];

    async findAll(): Promise<ReviewEntity[]> {
        return await this.reviewRepository
            .createQueryBuilder('review')
            .select(this._selector)
            .withDeleted()
            .leftJoin('review.user', 'user')
            .leftJoin('review.product', 'product')
            .orderBy('review.createAt')
            .getMany();
    }

    async findOne(
        reviewID: string, //
    ): Promise<ReviewEntity> {
        return await this.reviewRepository
            .createQueryBuilder('review')
            .select(this._selector)
            .withDeleted()
            .where('review.id=:id', { id: reviewID })
            .leftJoin('review.user', 'user')
            .leftJoin('review.product', 'product')
            .getOne();
    }
}
