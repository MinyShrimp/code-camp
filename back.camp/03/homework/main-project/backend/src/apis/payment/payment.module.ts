import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { ProductEntity } from '../product/entities/product.entity';
import { ProductModule } from '../product/product.module';

import { PaymentEntity } from './entities/payment.entity';
import { IMPService } from './imp.service';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { PaymentCheckService } from './paymentCheck.service';
import { PaymentAdminController } from './payment.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity, //
            PaymentEntity,
            ProductEntity,
        ]),
        UserModule,
        ProductModule,
    ],
    controllers: [
        PaymentAdminController, //
    ],
    providers: [
        IMPService, //
        PaymentResolver,
        PaymentService,
        PaymentCheckService,
    ],
})
export class PaymentModule {}
