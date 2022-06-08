import { PartialType } from '@nestjs/graphql';
import { AuthorEntity } from '../../author/entities/author.entity';
import { BookImageEntity } from '../../bookImage/entities/bookImage.entity';
import { PublisherEntity } from '../../publisher/entities/publisher.entity';
import { CreateBookDTO } from './createBook.dto';

export class UpdateBookDTO extends PartialType(CreateBookDTO) {
    publisher?: PublisherEntity;
    author?: AuthorEntity;
    book_images?: BookImageEntity[];
}
