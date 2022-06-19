import { Controller, Get, Param } from '@nestjs/common';
import { ReviewEntity } from './entities/review.entity';
import { ReviewService } from './review.service';

@Controller('admin')
export class ReviewAdminController {
    constructor(
        private readonly reviewService: ReviewService, //
    ) {}

    @Get('/reviews')
    findAll(): Promise<ReviewEntity[]> {
        return this.reviewService.findAll();
    }

    @Get('/review/:id')
    findOne(
        @Param('id') reviewID: string, //
    ): Promise<ReviewEntity> {
        return this.reviewService.findOne(reviewID);
    }
}
