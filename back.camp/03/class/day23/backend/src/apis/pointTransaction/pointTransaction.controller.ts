import { Controller } from "@nestjs/common";
import { PointTransactionService } from "./pointTransaction.service";

@Controller()
export class PointTransactionController {
    constructor(
        private readonly pointTransactionService: PointTransactionService //
    ) {}
}
