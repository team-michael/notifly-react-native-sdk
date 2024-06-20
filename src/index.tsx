import { NativeModules, Platform } from 'react-native';
import type {
  InitializeParams,
  EventProperties,
  UserProperties,
  NotificationClickListener,
  OSNotificationClickEvent,
} from './types';
import EventReceiver from './events/EventReceiver';
import { EventNames } from './constants';

export type * from './types';

const LINKING_ERROR =
  `The package 'notifly-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const NotiflyReactNativeSdkModule = isTurboModuleEnabled
  ? require('./NativeNotiflyReactNativeSdk').default
  : NativeModules.NotiflyReactNativeSdk;

const NotiflyReactNativeSdk = NotiflyReactNativeSdkModule
  ? NotiflyReactNativeSdkModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const eventReceiver =
  NotiflyReactNativeSdkModule && Platform.OS === 'android'
    ? new EventReceiver(NotiflyReactNativeSdkModule)
    : null;

let isNativeNotificationClickListenerRegistered = false;

export function initialize(params: InitializeParams): Promise<void> {
  return NotiflyReactNativeSdk.initialize(
    params.projectId,
    params.username,
    params.password
  );
}

export function setUserId(userId: string | null | undefined): Promise<void> {
  return NotiflyReactNativeSdk.setUserId(userId);
}

export function setUserProperties(properties: UserProperties): Promise<void> {
  return NotiflyReactNativeSdk.setUserProperties(properties);
}

export function setEmail(email: string): Promise<void> {
  return NotiflyReactNativeSdk.setEmail(email);
}

export function setPhoneNumber(phoneNumber: string): Promise<void> {
  return NotiflyReactNativeSdk.setPhoneNumber(phoneNumber);
}

export function setTimezone(timezone: string): Promise<void> {
  return NotiflyReactNativeSdk.setTimezone(timezone);
}

export function trackEvent(
  eventName: string,
  eventParams: EventProperties | null | undefined = undefined,
  segmentationEventParamKeys: string[] | undefined | null = null
): Promise<void> {
  return NotiflyReactNativeSdk.trackEvent(
    eventName,
    eventParams,
    segmentationEventParamKeys
  );
}

export function setLogLevel(logLevel: number): Promise<void> {
  // only implemented on Android
  if (Platform.OS === 'android') {
    return NotiflyReactNativeSdk.setLogLevel(logLevel);
  } else {
    console.error(
      '[Notifly React Native SDK] setLogLevel is only supported on Android.'
    );
  }
  return Promise.resolve();
}

export function disableInAppMessage(): Promise<void> {
  return NotiflyReactNativeSdk.disableInAppMessage();
}

export function addNotificationClickListener(
  listener: NotificationClickListener
): Promise<void> {
  if (eventReceiver) {
    // only implemented on Android
    eventReceiver.addEventListener<OSNotificationClickEvent>(
      EventNames.NOTIFICATION_CLICKED,
      listener
    );

    if (!isNativeNotificationClickListenerRegistered) {
      NotiflyReactNativeSdk.addNotificationClickListener();
      isNativeNotificationClickListenerRegistered = true;
    }
  } else {
    console.error(
      '[Notifly React Native SDK] addNotificationClickListener is only supported on Android.'
    );
  }

  return Promise.resolve();
}

const notifly = {
  initialize,
  setUserId,
  setUserProperties,
  setEmail,
  setPhoneNumber,
  setTimezone,
  trackEvent,
  setLogLevel,
  disableInAppMessage,
  addNotificationClickListener,
};

export default notifly;
