import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePointTransactionInput } from "./dto/createPointTransaction.input";
import {
    PointTransationEntity,
    POINT_TRANSACTION_STATUS_ENUM,
} from "./entities/pointTransaction.entity";

@Injectable()
export class PointTransactionService {
    constructor(
        @InjectRepository(PointTransationEntity)
        private readonly pointTransationRepository: Repository<PointTransationEntity>
    ) {}

    async create(
        createPointTransactionInput: CreatePointTransactionInput //
    ) {
        return await this.pointTransationRepository.save({
            ...createPointTransactionInput,
            status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
        });
    }
}
