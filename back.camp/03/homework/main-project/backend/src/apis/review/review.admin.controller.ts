import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateReviewInput } from './dto/createReview.input';
import { ReviewAdminRepository } from './entities/review.admin.repository';
import { ReviewEntity } from './entities/review.entity';
import { ReviewService } from './review.service';

@Controller('admin')
export class ReviewAdminController {
    constructor(
        private readonly reviewService: ReviewService, //
        private readonly reviewAdminRepository: ReviewAdminRepository,
    ) {}

    @Get('/reviews')
    findAll(): Promise<ReviewEntity[]> {
        return this.reviewAdminRepository.findAll();
    }

    @Get('/review/:id')
    findOne(
        @Param('id') reviewID: string, //
    ): Promise<ReviewEntity> {
        return this.reviewAdminRepository.findOne(reviewID);
    }

    @Post('/review')
    create(
        @Body() input: CreateReviewInput, //
    ): Promise<ReviewEntity> {
        return this.reviewService.create(input);
    }

    @Delete('/reviews')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ) {
        await this.reviewAdminRepository.bulkDelete(IDs);
        return 'delete ok';
    }
}
