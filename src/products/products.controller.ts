import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PricingService } from 'src/pricing/pricing.service';
import { RegularPricingStrategy } from 'src/pricing/regular.pricing.strategy.service';

@Controller('product')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(RegularPricingStrategy)
    private pricingService: PricingService,
  ) {}

  @Get('/pricing/:id')
  public async calculateOrderPrice(
    @Param('id') id: string,
  ): Promise<{ price: number }> {
    const product = await this.productsService.findOne(parseInt(id));

    return { price: this.pricingService.calculatePrice(product.price) };
  }
}
