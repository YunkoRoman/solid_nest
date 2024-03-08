import { Controller, Body, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { EmailsService } from 'src/notification/emails.service';
import { SubmitOrderDto } from './dto/order.dto';
import { PaymentService } from 'src/payment/payment.service';
import { CreditCardGateway, PAYMENT_METHOD } from 'src/payment/payment.gateway';

@Controller('order')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly emailsService: EmailsService,
    private paymentService: PaymentService,
  ) {
    this.paymentService.registerPaymentGateway(
      PAYMENT_METHOD.CREDIT_CARD,
      new CreditCardGateway(),
    );
  }

  @Post()
  public async submitOrder(@Body() submitOrderDto: SubmitOrderDto) {
    const createdOrder = await this.ordersService.submitOrder(submitOrderDto);

    await this.paymentService.processPayment(
      createdOrder,
      PAYMENT_METHOD.CREDIT_CARD,
    );

    //✅ Good
    //Services should allow us to share code between modules easily and effortlessly
    //Each Service method should follow a SRP
    await this.emailsService.sendOrderEmail(createdOrder.orderId);

    return {
      message: 'Thanks for you order!',
      orderNumber: createdOrder.orderId,
    };
  }
}
