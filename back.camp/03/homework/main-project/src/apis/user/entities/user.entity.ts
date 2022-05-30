/**
 * 유저 Entity
 */

import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export default class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 이름
    @Column()
    name: string;

    // 이메일
    @Column()
    email: string;

    // 비밀번호
    @Column()
    pwd: string;

    // salt
    @Column()
    salt: string;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 업데이트 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @DeleteDateColumn()
    deleteAt: Date;
}
