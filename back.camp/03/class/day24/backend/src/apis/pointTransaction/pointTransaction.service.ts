import { Injectable } from "@nestjs/common";
import { ICurrentUser } from "src/commons/auth/gql-user.param";
import { Connection } from "typeorm";
import { UserRepository } from "../users/users.repository";
import { CreatePointTransactionInput } from "./dto/createPointTransaction.input";
import { POINT_TRANSACTION_STATUS_ENUM } from "./entities/pointTransaction.entity";
import { PointTransactionRepository } from "./pointTransaction.repository";

@Injectable()
export class PointTransactionService {
    constructor(
        private readonly connection: Connection,
        private readonly userRepository: UserRepository,
        private readonly pointTransationRepository: PointTransactionRepository
    ) {}

    async create(
        currentUser: ICurrentUser,
        createPointTransactionInput: CreatePointTransactionInput //
    ) {
        ///////////////////////////////////////////////////////////////////
        // Query Runner //
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        let transaction = undefined;

        try {
            // 1. pointTransaction 테이블에 거래 기록 생성
            transaction = this.pointTransationRepository.create({
                ...createPointTransactionInput,
                status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
            });
            await queryRunner.manager.save(transaction);

            // 2. 유저의 돈 찾아오기
            // 3. 유저의 돈 업데이트
            // await this.userService.updateAmount(currentUser.id, createPointTransactionInput.amount);
            const user = await this.userRepository
                .createQueryBuilder("user")
                .select(["user.id", "user.amount"])
                .where(`user.id = '${currentUser.id}'`)
                .getOne();

            const updateUser = this.userRepository.create({
                ...user,
                amount: user.amount + createPointTransactionInput.amount,
            });
            await queryRunner.manager.save(updateUser);

            ///////////////////////////////////////////////////////////////////
            // Commit //
            await queryRunner.commitTransaction();
        } catch (e) {
            ///////////////////////////////////////////////////////////////////
            // Rollback //
            await queryRunner.rollbackTransaction();
        } finally {
            ///////////////////////////////////////////////////////////////////
            // 접속 종료 //
            await queryRunner.release();
            return transaction;
        }
    }
}
