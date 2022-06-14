import { Injectable } from "@nestjs/common";
import { ICurrentUser } from "src/commons/auth/gql-user.param";
import { Connection } from "typeorm";
import UserEntity from "../users/entities/user.entity";
import { UserRepository } from "../users/users.repository";
import { CreatePointTransactionInput } from "./dto/createPointTransaction.input";
import { POINT_TRANSACTION_STATUS_ENUM } from "./entities/pointTransaction.entity";
import { PointTransactionRepository } from "./pointTransaction.repository";

@Injectable()
export class PointTransactionService {
    private queryRunner = undefined;

    constructor(
        private readonly connection: Connection,
        private readonly userRepository: UserRepository,
        private readonly pointTransationRepository: PointTransactionRepository
    ) {
        this.queryRunner = this.connection.createQueryRunner();
    }

    async create(
        currentUser: ICurrentUser,
        createPointTransactionInput: CreatePointTransactionInput //
    ) {
        ///////////////////////////////////////////////////////////////////
        // Query Runner //
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction("SERIALIZABLE");

        let transaction = undefined;

        try {
            // 1. pointTransaction 테이블에 거래 기록 생성
            transaction = this.pointTransationRepository.create({
                ...createPointTransactionInput,
                status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
            });
            await this.queryRunner.manager.save(transaction);

            // 2. 유저의 돈 찾아오기
            // 3. 유저의 돈 업데이트
            // await this.userService.updateAmount(currentUser.id, createPointTransactionInput.amount);
            const user = await this.queryRunner.manager.findOne(
                UserEntity,
                { id: currentUser.id },
                { lock: { mode: "pessimistic_write" } }
            );

            const updateUser = this.userRepository.create({
                ...user,
                amount: user.amount + createPointTransactionInput.amount,
            });
            await this.queryRunner.manager.save(updateUser);

            ///////////////////////////////////////////////////////////////////
            // Commit //
            await this.queryRunner.commitTransaction();
        } catch (e) {
            ///////////////////////////////////////////////////////////////////
            // Rollback //
            await this.queryRunner.rollbackTransaction();
        } finally {
            ///////////////////////////////////////////////////////////////////
            // 접속 종료 //
            await this.queryRunner.release();
            return transaction;
        }
    }
}
