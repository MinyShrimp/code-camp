import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from 'src/commons/dto/ResultMessage.dto';
import BookImageEntity from './entities/bookImage.entity';
import CreateBookImageInput from './dto/createBookImage.input';
import UpdateBookImageInput from './dto/updateBookImage.input';

@Injectable()
export default class BookImageService {
    constructor(
        @InjectRepository(BookImageEntity)
        private readonly bookImageRepository: Repository<BookImageEntity>,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 책 이미지 조회
     * @param bookImageID
     * @returns 조회된 책 이미지 정보
     */
    async findOne(
        bookImageID: string, //
    ): Promise<BookImageEntity> {
        return await this.bookImageRepository.findOne({
            where: { id: bookImageID },
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 책 이미지 생성
     * @param createBookImageInput
     * @returns 생성된 책 이미지 정보
     */
    async create(
        createBookImageInput: CreateBookImageInput,
    ): Promise<BookImageEntity> {
        const { ...input } = createBookImageInput;

        return await this.bookImageRepository.save({
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * 책 이미지 정보 수정
     * @param bookImageID
     * @param updateBookImageInput
     * @returns 수정된 이미지 정보
     */
    async update(
        bookImageID: string, //
        updateBookImageInput: UpdateBookImageInput,
    ): Promise<BookImageEntity> {
        const { ...input } = updateBookImageInput;

        const bookImage = await this.findOne(bookImageID);

        return await this.bookImageRepository.save({
            ...bookImage,
            ...input,
        });
    }

    /**
     * 책 이미지 삭제 취소
     * @param bookImageID
     * @returns ResultMessage
     */
    async restore(
        bookImageID: string, //
    ): Promise<ResultMessage> {
        const bookImage = await this.bookImageRepository.restore({
            id: bookImageID,
        });
        const isSuccess = bookImage.affected ? true : false;

        return new ResultMessage({
            id: bookImageID,
            isSuccess,
            contents: isSuccess
                ? 'Completed BookImage Restore'
                : 'Failed BookImage Restore',
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * 책 이미지 삭제 ( 삭제 O )
     * @param bookImageID
     * @returns ResultMessage
     */
    async delete(
        bookImageID: string, //
    ): Promise<ResultMessage> {
        const bookImage = await this.bookImageRepository.delete({
            id: bookImageID,
        });
        const isSuccess = bookImage.affected ? true : false;

        return new ResultMessage({
            id: bookImageID,
            isSuccess,
            contents: isSuccess
                ? 'Completed BookImage Delete'
                : 'Failed BookImage Delete',
        });
    }

    /**
     * 책 이미지 삭제 ( 삭제 X )
     * @param bookImageID
     * @returns ResultMessage
     */
    async softDelete(
        bookImageID: string, //
    ): Promise<ResultMessage> {
        const bookImage = await this.bookImageRepository.softDelete({
            id: bookImageID,
        });
        const isSuccess = bookImage.affected ? true : false;

        return new ResultMessage({
            id: bookImageID,
            isSuccess,
            contents: isSuccess
                ? 'Completed BookImage Soft Delete'
                : 'Failed BookImage Soft Delete',
        });
    }
}
