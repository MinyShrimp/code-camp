import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

import { ReviewEntity } from './entities/review.entity';
import { CreateReviewInput } from './dto/createReview.input';
import { UpdateReviewInput } from './dto/updateReview.input';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 리뷰 전체 조회
     * @returns 조회된 모든 리뷰 목록
     */
    async findAll(): Promise<ReviewEntity[]> {
        return await this.reviewRepository.find({});
    }

    /**
     * 리뷰 단일 조회
     * @param reviewID
     * @returns 조회된 리뷰 정보
     */
    async findOne(
        reviewID: string, //
    ): Promise<ReviewEntity> {
        return await this.reviewRepository.findOne({
            id: reviewID,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 리뷰 생성
     * @param createReviewInput
     * @returns 생성된 리뷰 정보
     */
    async create(
        createReviewInput: CreateReviewInput, //
    ): Promise<ReviewEntity> {
        const { ...input } = createReviewInput;

        return await this.reviewRepository.save({
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 리뷰 수정
     * @param reviewID
     * @param updateReviewInput
     * @returns 수정된 리뷰 정보
     */
    async update(
        reviewID: string, //
        updateReviewInput: UpdateReviewInput,
    ): Promise<ReviewEntity> {
        const { ...input } = updateReviewInput;

        const review = await this.findOne(reviewID);

        return await this.reviewRepository.save({
            ...review,
            ...input,
        });
    }

    /**
     * 리뷰 삭제 취소
     * @param reviewID
     * @returns ResultMessage
     */
    async restore(
        reviewID: string, //
    ): Promise<ResultMessage> {
        const result = await this.reviewRepository.restore({
            id: reviewID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: reviewID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Review Restore'
                : 'Failed Review Restore',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 리뷰 삭제 ( Real )
     * @param reviewID
     * @returns ResultMessage
     */
    async delete(
        reviewID: string, //
    ): Promise<ResultMessage> {
        const result = await this.reviewRepository.delete({
            id: reviewID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: reviewID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Review Delete'
                : 'Failed Review Delete',
        });
    }

    /**
     * 리뷰 삭제 ( Soft )
     * @param reviewID
     * @returns ResultMessage
     */
    async softDelete(
        reviewID: string, //
    ): Promise<ResultMessage> {
        const result = await this.reviewRepository.softDelete({
            id: reviewID,
        });
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            id: reviewID,
            isSuccess,
            contents: isSuccess
                ? 'Completed Review Soft Delete'
                : 'Failed Review Soft Delete',
        });
    }
}
