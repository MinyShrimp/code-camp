import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookImageEntity } from './bookImage.entity';

@Injectable()
export class BookImageAdminRepository {
    constructor(
        @InjectRepository(BookImageEntity)
        private readonly bookImageRepository: Repository<BookImageEntity>,
    ) {}

    private readonly _selector = [
        'bi.id',
        'bi.isMain',
        'book.id',
        'book.title',
        'file.id',
        'file.url',
    ];

    ///////////////////////////////////////////////////////////////////
    // Utils //

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * 전체 책 조회
     * @returns 모든 책 목록
     */
    async findAll(): Promise<BookImageEntity[]> {
        return await this.bookImageRepository
            .createQueryBuilder('bi')
            .select(this._selector)
            .withDeleted()
            .leftJoin('bi.book', 'book')
            .leftJoin('bi.file', 'file')
            .orderBy('book.createAt', 'ASC')
            .getMany();
    }

    /**
     * 단일 책 조회
     * @param bookImageID
     * @returns 단일 책
     */
    async findOne(
        bookImageID: string, //
    ): Promise<BookImageEntity> {
        return await this.bookImageRepository
            .createQueryBuilder('bi')
            .select([...this._selector, 'bi.deleteAt'])
            .withDeleted()
            .where('bi.id=:id', { id: bookImageID })
            .leftJoin('bi.book', 'book')
            .leftJoin('bi.file', 'file')
            .getOne();
    }
}
