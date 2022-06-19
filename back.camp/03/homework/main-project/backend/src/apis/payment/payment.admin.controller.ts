import { Controller, Get, Param } from '@nestjs/common';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Controller('admin')
export class PaymentAdminController {
    constructor(
        private readonly paymentService: PaymentService, //
    ) {}

    @Get('/payments')
    findAll(): Promise<PaymentEntity[]> {
        return this.paymentService.findAll();
    }

    @Get('/payment/:id')
    findOne(
        @Param('id') paymentID: string, //
    ): Promise<PaymentEntity> {
        return this.paymentService.findOne(paymentID);
    }
}
