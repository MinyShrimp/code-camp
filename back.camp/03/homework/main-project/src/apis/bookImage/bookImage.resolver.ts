import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';

import { BookImageEntity } from './entities/bookImage.entity';
import { CreateBookImageInput } from './dto/createBookImage.input';
import { UpdateBookImageInput } from './dto/updateBookImage.input';
import { BookImageService } from './bookImage.service';

/* 책 이미지 API */
@Resolver()
export class BookImageResolver {
    constructor(
        private readonly bookImageService: BookImageService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/book/image/:id
     * @param bookImageID
     * @response 책 이미지 정보
     */
    @Query(
        () => BookImageEntity, //
        { description: '책 이미지 정보 조회' },
    )
    fetchBookImage(
        @Args('bookImageID') bookImageID: string,
    ): Promise<BookImageEntity> {
        return this.bookImageService.findOne(bookImageID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/book/image
     * @param createBookImageInput
     * @response 생성된 책 이미지 정보
     */
    @Mutation(
        () => BookImageEntity, //
        { description: '책 이미지 생성' },
    )
    createBookImage(
        @Args('createBookImageInput')
        createBookImageInput: CreateBookImageInput,
    ): Promise<BookImageEntity> {
        return this.bookImageService.create(createBookImageInput);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/book/image/:id
     * @param bookImageID
     * @param updateBookImageInput
     * @response 수정된 책 이미지 정보
     */
    @Mutation(
        () => BookImageEntity, //
        { description: '책 이미지 정보 수정' },
    )
    updateBookImage(
        @Args('bookImageID')
        bookImageID: string,
        @Args('updateBookImageInput')
        updateBookImageInput: UpdateBookImageInput,
    ): Promise<BookImageEntity> {
        return this.bookImageService.update(bookImageID, updateBookImageInput);
    }

    /**
     * PUT /api/book/image/:id
     * @param bookImageID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '책 이미지 삭제 취소' },
    )
    restoreBookImage(
        @Args('bookImageID') bookImageID: string,
    ): Promise<ResultMessage> {
        return this.bookImageService.restore(bookImageID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /admin/book/image/:id/
     * @param bookImageID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '책 이미지 삭제 ( Real )' },
    )
    deleteBookImage(
        @Args('bookImageID') bookImageID: string,
    ): Promise<ResultMessage> {
        return this.bookImageService.delete(bookImageID);
    }

    /**
     * DELETE /api/book/image/:id
     * @param bookImageID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '책 이미지 삭제 ( Soft )' },
    )
    softDeleteBookImage(
        @Args('bookImageID') bookImageID: string,
    ): Promise<ResultMessage> {
        return this.bookImageService.softDelete(bookImageID);
    }
}
