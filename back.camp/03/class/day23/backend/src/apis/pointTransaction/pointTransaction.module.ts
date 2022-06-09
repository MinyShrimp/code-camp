import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAccessStrategy } from "src/commons/auth/jwt-access.strategy";
import UserModule from "../users/users.module";
import { PointTransationEntity } from "./entities/pointTransaction.entity";
import { PointTransactionController } from "./pointTransaction.controller";
import { PointTransactionResolver } from "./pointTransaction.resolver";
import { PointTransactionService } from "./pointTransaction.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PointTransationEntity, //
        ]),
        UserModule,
    ],
    controllers: [
        PointTransactionController, //
    ],
    providers: [
        JwtAccessStrategy,
        PointTransactionResolver,
        PointTransactionService, //
    ],
})
export class PointTransactionModule {}
