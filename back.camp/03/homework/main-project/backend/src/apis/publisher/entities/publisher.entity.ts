import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 * 출판사 Entity
 */
@Entity({ name: 'publisher' })
@ObjectType({ description: '출판사 Entity' })
export class PublisherEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 이름
    @Column()
    @Field(() => String, { description: '이름' })
    name: string;

    // 설명
    @Column()
    @Field(() => String, { description: '설명' })
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
