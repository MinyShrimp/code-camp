import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ResultMessage from 'src/commons/dto/ResultMessage.dto';
import CreateReviewInput from './dto/createReview.input';
import UpdateReviewInput from './dto/updateReview.input';

import ReviewEntity from './entities/review.entity';
import ReviewService from './review.service';

/* 리뷰 API */
@Resolver()
export default class ReviewResolver {
    constructor(
        private readonly reviewService: ReviewService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/reviews
     * @returns 조회된 전체 리뷰
     */
    @Query(
        () => [ReviewEntity], //
        { description: '리뷰 전체 조회' },
    )
    fetchReviews(): Promise<ReviewEntity[]> {
        return this.reviewService.findAll();
    }

    /**
     * GET /api/review/:id
     * @param reviewID
     * @returns 조회된 단일 리뷰
     */
    @Query(
        () => ReviewEntity, //
        { description: '리뷰 단일 조회' },
    )
    fetchReview(
        @Args('reviewID') reviewID: string, //
    ): Promise<ReviewEntity> {
        return this.reviewService.findOne(reviewID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/review
     * @param createReviewInput
     * @returns 생성된 리뷰 정보
     */
    @Mutation(
        () => ReviewEntity, //
        { description: '리뷰 생성' },
    )
    createReview(
        @Args('createReviewInput') createReviewInput: CreateReviewInput,
    ): Promise<ReviewEntity> {
        return this.reviewService.create(createReviewInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/review/:id
     * @param reviewID
     * @param updateReviewInput
     * @returns 수정된 리뷰 정보
     */
    @Mutation(
        () => ReviewEntity, //
        { description: '리뷰 수정' },
    )
    updateReview(
        @Args('reviewID') reviewID: string, //
        @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
    ): Promise<ReviewEntity> {
        return this.reviewService.update(reviewID, updateReviewInput);
    }

    /**
     * PUT /api/review/:id
     * @param reviewID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '리뷰 삭제 취소' },
    )
    restoreReview(
        @Args('reviewID') reviewID: string, //
    ): Promise<ResultMessage> {
        return this.reviewService.restore(reviewID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/review/:id
     * @param reviewID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '리뷰 삭제 ( Real )' },
    )
    deleteReview(
        @Args('reviewID') reviewID: string, //
    ): Promise<ResultMessage> {
        return this.reviewService.delete(reviewID);
    }

    /**
     * DELETE /api/review/:id
     * @param reviewID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '리뷰 삭제 ( Soft )' },
    )
    softDeleteReview(
        @Args('reviewID') reviewID: string, //
    ): Promise<ResultMessage> {
        return this.reviewService.softDelete(reviewID);
    }
}
