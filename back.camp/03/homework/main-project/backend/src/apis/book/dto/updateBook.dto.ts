import { PartialType } from '@nestjs/graphql';
import { AuthorEntity } from 'src/apis/author/entities/author.entity';
import { BookImageEntity } from 'src/apis/bookImage/entities/bookImage.entity';
import { PublisherEntity } from 'src/apis/publisher/entities/publisher.entity';
import { CreateBookDTO } from './createBook.dto';

export class UpdateBookDTO extends PartialType(CreateBookDTO) {
    publisher?: PublisherEntity;
    author?: AuthorEntity;
    book_images?: BookImageEntity[];
}
