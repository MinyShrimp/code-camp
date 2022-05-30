/**
 * 출판사 Entity
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'publisher' })
export default class PublisherEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 이름
    @Column()
    name: string;

    // 설명
    @Column()
    description: string;
}
