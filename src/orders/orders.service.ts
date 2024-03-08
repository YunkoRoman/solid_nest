import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubmitOrderDto } from './dto/order.dto';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async submitOrder(dto: SubmitOrderDto): Promise<Order> {
    const data: Prisma.OrderCreateInput = {
      products: { connect: [{ id: dto.productId }] },
    };
    const createdOrder = await this.prisma.order.create({ data });
    //Save order on the Database
    //TODO: Add Database saving for order

    //❌ Bad
    //Here we'are sending Order email inside the OrdersService which should
    //Have one responsibility (Taking care of Orders)
    // this.emailsService.sendOrderEmail(createdOrder.orderId);

    return createdOrder;
  }
}
