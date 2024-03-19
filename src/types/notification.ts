export type NotificationClickListener = (
  event: OSNotificationClickEvent
) => void;

export enum OSNotificationImportance {
  LOW = 0,
  NORMAL = 1,
  HIGH = 2,
}

export interface OSNotificationClickEvent {
  notification: OSNotification;
}

export interface OSNotification {
  // The Notifly message ID of the notification.
  notiflyMessageId?: string;
  // (Only Android) The Android system notification ID of the notification.
  androidNotificationId?: number;
  // Notifly campaign ID where the notification was sent from.
  campaignId?: string;
  // Notification title
  title?: string;
  // Notification body
  body?: string;
  // (Only Android) Importance of the notification.
  importance?: OSNotificationImportance;
  // URL included in the notification.
  url?: string;
  // URL to the image included in the notification.
  imageUrl?: string;
  // Sent time of the notification in milliseconds since epoch
  sentTime?: number;
  // TTL of the notification in seconds
  ttl?: number;
  // Customized data included in the notification.
  customData?: { [key: string]: any };
  // Raw payload of the notification.
  rawPayload?: { [key: string]: any };
}
