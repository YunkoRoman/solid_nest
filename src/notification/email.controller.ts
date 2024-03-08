import { Controller, Post } from '@nestjs/common';
import { EmailNotification } from './entities/notification.interface';
import { NotificationService } from './notification.service';

@Controller('email')
export class EmailController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  sendEmail(notification: EmailNotification): void {
    this.notificationService.sendEmail(notification);
  }
}
