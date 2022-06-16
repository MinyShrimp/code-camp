import { Field, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import UserEntity from "src/apis/users/entities/user.entity";
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

export const POINT_TRANSACTION_STATUS_ENUM = {
    PAYMENT: "PAYMENT",
    CANCEL: "CANCEL",
} as const;
export type POINT_TRANSACTION_STATUS_ENUM =
    typeof POINT_TRANSACTION_STATUS_ENUM[keyof typeof POINT_TRANSACTION_STATUS_ENUM];

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, { name: "POINT_TRANSACTION_STATUS_ENUM" });

@ObjectType()
@Entity()
export class PointTransationEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // 아임포트 ID
    @Field(() => String)
    @Column()
    impUid: string;

    // 금액
    @Field(() => Int)
    @Column()
    amount: number;

    // 상태
    @Field(() => POINT_TRANSACTION_STATUS_ENUM)
    @Column({ type: "enum", enum: POINT_TRANSACTION_STATUS_ENUM })
    status: string;

    // 회원
    // @Field(() => UserEntity)
    @JoinColumn()
    @ManyToOne(() => UserEntity)
    user: UserEntity;

    // 결제 시간
    @CreateDateColumn()
    createAt: Date;
}
