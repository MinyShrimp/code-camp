import { EntityRepository, Repository } from "typeorm";
import { PointTransationEntity } from "./entities/pointTransaction.entity";

@EntityRepository(PointTransationEntity)
export class PointTransactionRepository extends Repository<PointTransationEntity> {}
