import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAccessStrategy } from "src/commons/auth/jwt-access.strategy";
import UserModule from "../users/users.module";
import { PointTransationEntity } from "./entities/pointTransaction.entity";
import { PointTransactionResolver } from "./pointTransaction.resolver";
import { PointTransactionService } from "./pointTransaction.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PointTransationEntity, //
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
