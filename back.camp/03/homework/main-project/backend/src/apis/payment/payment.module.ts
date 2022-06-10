import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

import { PaymentEntity } from './entities/payment.entity';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.contoller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentEntity, //
        ]),
        UserModule,
        ProductModule,
    ],
    controllers: [PaymentController],
    providers: [
        PaymentResolver, //
        PaymentService,
    ],
})
export class PaymentModule {}
