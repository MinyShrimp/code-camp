import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
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
        @Req() req: Request, //
    ): Promise<ReviewEntity> {
        return this.reviewService.create(req.body);
    }

    @Delete('/reviews')
    async bulkDelete(
        @Req() req: Request, //
    ) {
        await this.reviewAdminRepository.bulkDelete(req.body);
        return 'delete ok';
    }
}
