import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'author' })
@ObjectType({ description: '저자 Entity' })
export class AuthorEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 이름
    @Column()
    @Field(
        () => String, //
        { description: '저자 이름' },
    )
    name: string;

    // 설명
    @Column()
    @Field(
        () => String, //
        { description: '저자 설명' },
    )
    description: string;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 수정 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @DeleteDateColumn()
    deleteAt: Date;
}
