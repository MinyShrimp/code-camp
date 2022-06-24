import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePaymentInput } from './dto/createPayment.input';
import { PaymentAdminRepository } from './entities/payment.admin.repository';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Controller('admin')
export class PaymentAdminController {
    constructor(
        private readonly paymentService: PaymentService, //
        private readonly paymentRepository: PaymentAdminRepository,
    ) {}

    @Get('/payments')
    findAll(): Promise<PaymentEntity[]> {
        return this.paymentRepository.findAll();
    }

    @Get('/payment/:id')
    findOne(
        @Param('id') paymentID: string, //
    ): Promise<PaymentEntity> {
        return this.paymentRepository.findOne(paymentID);
    }

    // @Post('/product-category')
    // createCategory(
    //     @Body() input: CreatePaymentInput, //
    // ) {
    //     return this.paymentService.createPayment(input);
    // }

    @Delete('/product-categorys')
    async bulkDelete(
        @Body() IDs: Array<string>, //
    ) {
        await this.paymentRepository.bulkDelete(IDs);
        return 'delete ok';
    }
}
