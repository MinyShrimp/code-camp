import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MESSAGES } from '../../commons/message/Message.enum';

import { BookImageEntity } from './entities/bookImage.entity';
import { CreateBookImageInput } from './dto/createBookImage.input';
import { UpdateBookImageInput } from './dto/updateBookImage.input';
import { BookEntity } from '../book/entities/book.entity';
import { FileUploadService } from '../fileUpload/fileUpload.service';

@Injectable()
export class BookImageService {
    constructor(
        @InjectRepository(BookImageEntity)
        private readonly bookImageRepository: Repository<BookImageEntity>,
        private readonly fileUploadService: FileUploadService,
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
            throw new ConflictException(MESSAGES.BOOK_IMG_FINE_ONE_FAILED);
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
        const ids = imgInputs.map((v) => v.uploadImageID);
        const isMains = imgInputs.map((v) => v.isMain);

        const uploadImgs = await Promise.all(
            ids.map((id) => {
                return this.fileUploadService.findOne(id);
            }),
        );

        const images: BookImageEntity[] = await Promise.all(
            uploadImgs.map((uploadImage, idx) => {
                return this.bookImageRepository.save({
                    isMain: isMains[idx],
                    uploadImage,
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
        const { uploadImageID, ...input } = updateBookImageInput;

        const bookImage = await this.findOne(bookImageID);

        return await this.bookImageRepository.save({
            ...bookImage,
            ...input,
        });
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    async deleteAll(): Promise<Boolean> {
        const result = await this.bookImageRepository.delete({});
        const isSuccess = result.affected ? true : false;
        return isSuccess;
    }
}
