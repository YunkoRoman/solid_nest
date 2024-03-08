import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { NotificationService } from './notification.service';
import { EmailController } from './email.controller';
import { SMSController } from './sms.controller';
import { PushNotificationController } from './push.notification.controller';

@Module({
  providers: [EmailsService, NotificationService],
  exports: [EmailsService],
  controllers: [EmailController, SMSController, PushNotificationController],
})
export class NotificationModule {}
