import { NativeModules, Platform } from 'react-native';
import type {
  InitializeParams,
  EventProperties,
  UserProperties,
} from './types';

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

export type { InitializeParams, EventProperties, UserProperties };

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
    console.warn(
      '[Notifly React Native SDK] setLogLevel is only supported on Android.'
    );
  }
  return Promise.resolve();
}

export function disableInAppMessage(): Promise<void> {
  return NotiflyReactNativeSdk.disableInAppMessage();
}

const notifly = {
  initialize,
  setUserId,
  setUserProperties,
  trackEvent,
  setLogLevel,
  disableInAppMessage,
};

export default notifly;
