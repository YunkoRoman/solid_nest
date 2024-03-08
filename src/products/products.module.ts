import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PricingModule } from 'src/pricing/pricing.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PricingModule, PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
