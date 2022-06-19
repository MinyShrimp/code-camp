import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { ResultMessage } from '../../commons/message/ResultMessage.dto';

import { AuthorService } from '../author/author.service';
import { PublisherService } from '../publisher/publisher.service';
import { BookImageService } from '../bookImage/bookImage.service';
import { FileUploadService } from '../fileUpload/fileUpload.service';

import { BookEntity } from './entities/book.entity';
import { CreateBookInput } from './dto/createBook.input';
import { UpdateBookInput } from './dto/updateBook.input';
import { BookService } from './book.service';

/* 책 API */
@Resolver()
export class BookResolver {
    constructor(
        private readonly bookService: BookService,
        private readonly authorService: AuthorService,
        private readonly publisherService: PublisherService,
        private readonly bookImageService: BookImageService,
        private readonly fileUploadService: FileUploadService,
    ) {}

    ///////////////////////////////////////////////////////////////////
    // 조회 //

    /**
     * GET /api/books
     * @response 조회된 책 목록
     */
    @Query(
        () => [BookEntity], //
        { description: '모든 책 조회' },
    )
    fetchBooks(): Promise<BookEntity[]> {
        return this.bookService.findAll();
    }

    /**
     * GET /api/book/:id
     * @param bookID
     * @response 조회된 책 단일 정보
     */
    @Query(
        () => BookEntity, //
        { description: '단일 책 조회' },
    )
    fetchBook(
        @Args('bookID') bookID: string, //
    ): Promise<BookEntity> {
        return this.bookService.findOne(bookID);
    }

    ///////////////////////////////////////////////////////////////////
    // 생성 //

    /**
     * POST /api/book
     * @param createBookInput
     * @response 생성된 책 정보
     */
    @Mutation(
        () => BookEntity, //
        { description: '책 정보 생성' },
    )
    async createBook(
        @Args('createBookInput') createBookInput: CreateBookInput,
        @Args({ name: 'files', type: () => [GraphQLUpload] })
        files: FileUpload[],
    ): Promise<BookEntity> {
        const { authorId, publisherId, ...input } = createBookInput;

        const author = await this.authorService.findOne(authorId);
        const publisher = await this.publisherService.findOne(publisherId);
        const book = await this.bookService.create(input, author, publisher);

        const upload_images = await this.fileUploadService.upload(
            'book/',
            files,
        );
        const imageDtos = upload_images.map((v, i) => {
            return {
                uploadImageID: v.id,
                isMain: i === 0,
            };
        });
        const book_images = await this.bookImageService.create(book, imageDtos);

        this.bookService.update(
            { ...input, author, publisher, book_images },
            book,
        );

        return await this.bookService.findOne(book.id);
    }

    ///////////////////////////////////////////////////////////////////
    // 수정 //

    /**
     * PATCH /api/book/:id
     * @param bookID
     * @param updateBookInput
     * @response 수정된 책 정보
     */
    @Mutation(
        () => BookEntity, //
        { description: '책 정보 수정' },
    )
    async updateBook(
        @Args('bookID') bookID: string,
        @Args('updateBookInput') updateBookInput: UpdateBookInput,
        @Args({ name: 'files', type: () => [GraphQLUpload] })
        files: FileUpload[],
    ): Promise<BookEntity> {
        const { authorId, publisherId, isChange, ...input } = updateBookInput;

        const book = await this.bookService.findOne(bookID);

        const author =
            authorId === undefined
                ? book.author
                : await this.authorService.findOne(authorId);

        const publisher =
            publisherId === undefined
                ? book.publisher
                : await this.publisherService.findOne(publisherId);

        if (isChange) {
            const images = await this.bookImageService.findAllByBook(book);
            const img_ids = images.map((v) => v.uploadImage.id);
            await this.fileUploadService.softDelete(img_ids);

            // 원래 연결되어있던 이미지를 연결해제
            await this.bookImageService.softDelete(book);

            // 다시 생성
            const upload_images = await this.fileUploadService.upload(
                'book/',
                files,
            );
            const imageDtos = upload_images.map((v, i) => {
                return {
                    uploadImageID: v.id,
                    isMain: i === 0,
                };
            });
            const book_images = await this.bookImageService.create(
                book,
                imageDtos,
            );

            return await this.bookService.update(
                { ...input, author, publisher, book_images },
                book,
            );
        } else {
            return await this.bookService.update(
                { ...input, author, publisher },
                book,
            );
        }
    }

    /**
     * PUT /api/book/:id
     * @param bookID
     * @response ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '책 정보 삭제 취소' },
    )
    async restoreBook(
        @Args('bookID') bookID: string, //
    ): Promise<ResultMessage> {
        // const book = await this.bookService.findOne(bookID);
        // await this.bookImageService.restore(book);
        return this.bookService.restore(bookID);
    }

    ///////////////////////////////////////////////////////////////////
    // 삭제 //

    /**
     * DELETE /api/book/:id
     * @param bookID
     * @returns ResultMessage
     */
    @Mutation(
        () => ResultMessage, //
        { description: '단일 책 삭제 ( Soft )' },
    )
    async softDeleteBook(
        @Args('bookID') bookID: string, //
    ): Promise<ResultMessage> {
        // const book = await this.bookService.findOne(bookID);
        // await this.bookImageService.softDelete(book);
        return await this.bookService.softDelete(bookID);
    }

    @Mutation(
        () => ResultMessage, //
        { description: '단일 책 삭제 ( Real )' },
    )
    async deleteImage(
        @Args('bookID') bookID: string, //
    ): Promise<ResultMessage> {
        const book = await this.bookService.findOne(bookID);
        const imgs = book.book_images;
        const uploads = imgs.map((v) => v.uploadImage);

        await this.fileUploadService.softDelete(uploads.map((v) => v.id));
        await this.bookImageService.softDelete(book);

        return await this.bookService.softDelete(bookID);
    }
}
