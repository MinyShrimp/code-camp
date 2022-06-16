import { InputType, PickType } from "@nestjs/graphql";
import { PointTransationEntity } from "../entities/pointTransaction.entity";

@InputType()
export class CreatePointTransactionInput extends PickType(
    PointTransationEntity,
    ["impUid", "amount"],
    InputType
) {}
