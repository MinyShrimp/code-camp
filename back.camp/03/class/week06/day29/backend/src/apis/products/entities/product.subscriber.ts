import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from "typeorm";
import ProductEntity from "./product.entity";
import { BigQuery } from "@google-cloud/bigquery";

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<ProductEntity> {
    constructor(
        private readonly connection: Connection //
    ) {
        this.connection.subscribers.push(this);
    }

    listenTo(): string | Function {
        return ProductEntity;
    }

    /**
     * Insert 이후에 실행
     * @param event
     */
    afterInsert(
        event: InsertEvent<ProductEntity> //
    ): void | Promise<any> {
        console.log(event);

        const bigQuery = new BigQuery({
            keyFilename: "./key/gcp-bigquery.json",
            projectId: process.env.FILE_PROJECT_ID,
        });

        bigQuery
            .dataset("Codecamp_Class")
            .table("product-log")
            .insert([
                {
                    id: event.entity.id,
                    name: event.entity.name,
                    description: event.entity.description,
                    price: event.entity.price,
                    isSoldout: event.entity.isSoldout,
                },
            ]);
    }

    /**
     * Insert 이전에 실행
     * @param event
     */
    beforeInsert(
        event: InsertEvent<ProductEntity> //
    ): void | Promise<any> {}

    /**
     * Update 이후에 실행
     * @param event
     */
    afterUpdate(
        event: UpdateEvent<ProductEntity> //
    ): void | Promise<any> {}
}
