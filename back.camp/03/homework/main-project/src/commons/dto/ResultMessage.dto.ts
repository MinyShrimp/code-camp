import { Field, ObjectType } from '@nestjs/graphql';
import Message from 'src/commons/interfaces/Message.interface';

@ObjectType({
    description: '결과 메세지',
})
export default class ResultMessage {
    /**
     * Message {
     *   id?: string;
     *   contents: string;
     *   isSuccess: boolean;
     * }
     */
    constructor(msg: Message) {
        this.id = msg.id ?? null;
        this.msg = msg.contents;
        this.isSuccess = msg.isSuccess;
    }

    @Field(
        () => String, //
        { nullable: true, description: '대상 ID' },
    )
    id?: string;

    @Field(
        () => String, //
        { description: 'Message' },
    )
    msg: string;

    @Field(
        () => Boolean, //
        { description: '성공 여부' },
    )
    isSuccess: boolean;
}
