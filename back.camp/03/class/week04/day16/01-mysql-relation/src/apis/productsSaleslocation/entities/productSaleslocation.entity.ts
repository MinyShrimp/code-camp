/**
 * 상품 판매 위치 Entity
 */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product_sales_location" })
export default class ProductSalesLocationEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // 주소
    @Column()
    address: string;

    // 상세 주소
    @Column()
    addressDetail: string;

    // 위도
    // @Column({ type: "decimal" })
    @Column()
    lat: number;

    // 경도
    @Column()
    lng: number;

    // 만남 시간
    @Column()
    meetingTime: Date;
}
