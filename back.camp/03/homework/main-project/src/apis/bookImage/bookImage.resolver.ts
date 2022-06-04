import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import ResultMessage from 'src/commons/dto/ResultMessage.dto';

import BookImageEntity from './entities/bookImage.entity';
import CreateBookImageInput from './dto/createBookImage.input';
import UpdateBookImageInput from './dto/updateBookImage.input';
import BookImageService from './bookImage.service';

@Resolver()
export default class BookImageResolver {
    constructor(
        private readonly bookImageService: BookImageService, //
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/book/image/:id
     * @param bookImageID
     * @returns 책 이미지 정보
     *
     * 책 이미지 조회
     */
    @Query(() => BookImageEntity)
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
     * @returns 생성된 책 이미지 정보
     *
     * 책 이미지 생성
     */
    @Mutation(() => BookImageEntity)
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
     * @returns 수정된 책 이미지 정보
     *
     * 책 이미지 정보 수정
     */
    @Mutation(() => BookImageEntity)
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
     * @returns ResultMessage
     *
     * 책 이미지 삭제 취소
     */
    @Mutation(() => ResultMessage)
    restoreBookImage(
        @Args('bookImageID') bookImageID: string,
    ): Promise<ResultMessage> {
        return this.bookImageService.restore(bookImageID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /api/book/image/:id/:admin
     * @param bookImageID
     * @returns ResultMessage
     *
     * 책 이미지 삭제 ( 삭제 O )
     */
    @Mutation(() => ResultMessage)
    deleteBookImage(
        @Args('bookImageID') bookImageID: string,
    ): Promise<ResultMessage> {
        return this.bookImageService.delete(bookImageID);
    }

    /**
     * DELETE /api/book/image/:id
     * @param bookImageID
     * @returns ResultMessage
     *
     * 책 이미지 삭제 ( 삭제 X )
     */
    @Mutation(() => ResultMessage)
    softDeleteBookImage(
        @Args('bookImageID') bookImageID: string,
    ): Promise<ResultMessage> {
        return this.bookImageService.softDelete(bookImageID);
    }
}
