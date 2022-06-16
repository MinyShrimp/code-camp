/**
 * 상품 판매 위치 Entity
 */

import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "product_sales_location" })
export default class ProductSalesLocationEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // 주소
    @Field(() => String)
    @Column()
    address: string;

    // 상세 주소
    @Field(() => String)
    @Column()
    addressDetail: string;

    // 위도
    // @Column({ type: "decimal" })
    @Field(() => Float)
    @Column()
    lat: number;

    // 경도
    @Field(() => Float)
    @Column()
    lng: number;

    // 만남 시간
    @Field(() => Date)
    @Column()
    meetingTime: Date;
}
