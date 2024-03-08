// notification.service.ts
import { Injectable } from '@nestjs/common';
import {
  EmailNotification,
  SMSNotification,
  PushNotification,
} from './entities/notification.interface';

@Injectable()
export class NotificationService {
  //   async badSendEmail(notification: Notification) {
  //     // Define the parameters for the email
  //     const params = {
  //       Source: 'no-reply@coderone.io',
  //       Destination: {
  //         ToAddresses: [notification.to],
  //       },
  //       Message: {
  //         Subject: {
  //           Data: notification.subject,
  //         },
  //         Body: {
  //           Text: {
  //             Data: notification.body,
  //           },
  //         },
  //       },
  //     };

  //     await ses.sendEmail(params);
  //   }

  //   badSendSMS(notification: Notification) {
  //     // Logic to send SMS notification
  //   }

  //   badSendPushNotification(notification: Notification) {
  //     // Logic to send push notification
  //   }

  sendEmail(notification: EmailNotification) {
    console.log(notification);
    console.log('sendEmail');
  }

  sendSMS(notification: SMSNotification): void {
    console.log(notification);
    console.log('sendSMS');
  }

  sendPushNotification(notification: PushNotification): void {
    console.log(notification);
    console.log('sendPushNotification');
  }
}
