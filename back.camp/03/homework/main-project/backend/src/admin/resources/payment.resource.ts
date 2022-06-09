
import { PaymentEntity } from "../../apis/payment/entities/payment.entity";
import { Resource } from "../interfaces/resource.interface";

export const PaymentResource: Resource = {
    resource: PaymentEntity,
    options: {
        listProperties: [
            "id", "amount", "state", "type", 
            "user", "product",
            "createAt", "updateAt", 
        ],
        editProperties: [
            "amount", "state", "type", "user", "product"
        ],
        showProperties: [
            "id", "amount", "state", "type", 
            "user", "product",
            "createAt", "updateAt", "deleteAt", 
        ]
    }
}