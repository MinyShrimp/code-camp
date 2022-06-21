import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookImageAdminRepository } from './entities/bookImage.admin.repository';
import { BookImageEntity } from './entities/bookImage.entity';

@Injectable()
export class BookImageAdminService {
    constructor(
        private readonly bookImageRepository: BookImageAdminRepository,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 조회
     * @returns
     */
    async findAll(): Promise<BookImageEntity[]> {
        return await this.bookImageRepository.findAll();
    }

    /**
     * 책 이미지 조회
     * @param bookImageID
     * @returns 조회된 책 이미지 정보
     */
    async findOne(
        bookImageID: string, //
    ): Promise<BookImageEntity> {
        const bookImage = await this.bookImageRepository.findOne(bookImageID);
        return bookImage;
    }
}
