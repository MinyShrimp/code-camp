import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class BoardEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    writer: string;

    @Column()
    title: string;

    @Column()
    contents: string;
}
