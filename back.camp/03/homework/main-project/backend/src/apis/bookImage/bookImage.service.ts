import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultMessage } from '../../commons/dto/ResultMessage.dto';

import { BookImageEntity } from './entities/bookImage.entity';
import { CreateBookImageInput } from './dto/createBookImage.input';
import { UpdateBookImageInput } from './dto/updateBookImage.input';
import { BookEntity } from '../book/entities/book.entity';

@Injectable()
export class BookImageService {
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
        const bookImage = await this.bookImageRepository.findOne({
            where: { id: bookImageID },
        });
        if (!bookImage) {
            throw new ConflictException('책 이미지를 찾을 수 없습니다.');
        }
        return bookImage;
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * 책 이미지 생성
     * @param book
     * @param imgInputs
     * @returns 생성된 책 이미지 정보
     */
    async create(
        book: BookEntity,
        imgInputs: CreateBookImageInput[],
    ): Promise<BookImageEntity[]> {
        const images: BookImageEntity[] = await Promise.all(
            imgInputs.map((img) => {
                return this.bookImageRepository.save({
                    ...img,
                    book,
                });
            }),
        );

        return images;
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

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async deleteAll(): Promise<ResultMessage> {
        const result = await this.bookImageRepository.delete({});
        const isSuccess = result.affected ? true : false;

        return new ResultMessage({
            isSuccess,
            contents: isSuccess
                ? 'Completed Book Image All Delete'
                : 'Failed Book Image All Delete',
        });
    }
}
