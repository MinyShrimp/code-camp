import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser, ICurrentUser } from "src/apis/commons/auth/gql-user.param";
import { CreatePointTransactionInput } from "./dto/createPointTransaction.input";
import { PointTransationEntity } from "./entities/pointTransaction.entity";
import { PointTransactionService } from "./pointTransaction.service";

@Resolver()
export class PointTransactionResolver {
    constructor(
        private readonly pointTransactionService: PointTransactionService //
    ) {}

    // @UseGuards(GqlJwtAccessAccessGuard)
    @Mutation(() => PointTransationEntity)
    async createPointTransaction(
        @CurrentUser() currentUser: ICurrentUser,
        @Args("createPointTransactionInput")
        createPointTransactionInput: CreatePointTransactionInput
    ): Promise<PointTransationEntity> {
        return await this.pointTransactionService.create(currentUser, createPointTransactionInput);
    }
}
