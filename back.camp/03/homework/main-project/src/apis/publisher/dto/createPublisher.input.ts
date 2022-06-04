import { InputType, PickType } from '@nestjs/graphql';
import PublisherEntity from '../entities/publisher.entity';

@InputType()
export default class CreatePublisherInput extends PickType(
    PublisherEntity,
    ['name', 'description'],
    InputType,
) {}
