/**
 * 저자 Entity
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'author' })
export default class AuthorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 이름
    @Column()
    name: string;

    // 설명
    @Column()
    description: string;
}
