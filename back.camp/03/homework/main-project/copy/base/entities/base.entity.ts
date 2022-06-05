import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* Base Entity */
@Entity({ name: 'base' })
@ObjectType({ description: 'Base Entity' })
export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @DeleteDateColumn()
    deleteAt: Date;
}
