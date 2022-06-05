import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentEntity } from './entities/payment.entity';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentEntity, //
        ]),
    ],
    providers: [
        PaymentResolver, //
        PaymentService,
    ],
})
export class PaymentModule {}
