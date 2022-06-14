import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAccessStrategy } from "../commons/auth/jwt-access.strategy";
import UserModule from "../users/users.module";
import { UserRepository } from "../users/users.repository";
import { PointTransactionRepository } from "./pointTransaction.repository";
import { PointTransactionResolver } from "./pointTransaction.resolver";
import { PointTransactionService } from "./pointTransaction.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PointTransactionRepository, //
            UserRepository,
        ]),
        UserModule,
    ],
    providers: [
        JwtAccessStrategy,
        PointTransactionResolver,
        PointTransactionService, //
    ],
})
export class PointTransactionModule {}
