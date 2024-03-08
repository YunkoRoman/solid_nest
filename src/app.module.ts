import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';
import { PricingModule } from './pricing/pricing.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    PrismaModule,
    OrdersModule,
    ProductsModule,
    NotificationModule,
    PaymentModule,
    PricingModule,
    StorageModule,
  ],
})
export class AppModule {}
