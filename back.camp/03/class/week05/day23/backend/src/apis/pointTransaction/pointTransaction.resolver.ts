import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { GqlJwtAccessAccessGuard } from "src/commons/auth/gql-auth.guard";
import { CurrentUser, ICurrentUser } from "src/commons/auth/gql-user.param";
import UserService from "../users/users.service";
import { CreatePointTransactionInput } from "./dto/createPointTransaction.input";
import { PointTransationEntity } from "./entities/pointTransaction.entity";
import { PointTransactionService } from "./pointTransaction.service";

@Resolver()
export class PointTransactionResolver {
    constructor(
        private readonly pointTransactionService: PointTransactionService, //
        private readonly userService: UserService
    ) {}

    @UseGuards(GqlJwtAccessAccessGuard)
    @Mutation(() => PointTransationEntity)
    async createPointTransaction(
        @Args("createPointTransactionInput")
        createPointTransactionInput: CreatePointTransactionInput,
        @CurrentUser() currentUser: ICurrentUser
    ): Promise<PointTransationEntity> {
        console.log(currentUser);

        // 1. pointTransaction 테이블에 거래 기록 생성
        const save = await this.pointTransactionService.create(createPointTransactionInput);

        // 2. 유저의 돈 찾아오기
        // 3. 유저의 돈 업데이트
        await this.userService.updateAmount(currentUser.id, createPointTransactionInput.amount);

        // 4. 최종결과 return
        return save;
    }
}
