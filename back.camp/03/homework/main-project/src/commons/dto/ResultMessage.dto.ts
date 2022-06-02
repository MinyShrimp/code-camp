import { Field, ObjectType } from '@nestjs/graphql';
import Message from 'src/commons/interfaces/Message.interface';

@ObjectType()
export default class ResultMessage {
    constructor(msg: Message) {
        this.id = msg.id ?? null;
        this.msg = msg.contents;
    }

    @Field(() => String, { nullable: true })
    id?: string;

    @Field(() => String)
    msg: string;
}
