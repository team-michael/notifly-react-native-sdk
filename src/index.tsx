import { NativeModules, Platform } from 'react-native';
import { type UserProperties, type EventProperties } from './types';

const LINKING_ERROR =
  `The package 'notifly-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const NotiflySdkModule = isTurboModuleEnabled
  ? require('./NativeNotiflySdk').default
  : NativeModules.NotiflySdk;

const NotiflySdk = NotiflySdkModule
  ? NotiflySdkModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return NotiflySdk.multiply(a, b);
}

export function initialize(
  projectId: string,
  username: string,
  password: string,
  useCustomClickHandler: boolean | undefined = undefined
): Promise<void> {
  // @deprecated useCustomClickHandler is deprecated since version 2.3.0
  if (typeof useCustomClickHandler !== 'undefined') {
    console.warn(
      'Warning: useCustomClickHandler of notifly.initialize is deprecated and will be removed in the next major release.'
    );
  }
  return NotiflySdk.initialize(projectId, username, password);
}

export function setUserId(userId: string | undefined): Promise<void> {
  return NotiflySdk.setUserId(userId);
}

export function setUserProperties(properties: UserProperties): Promise<void> {
  return NotiflySdk.setUserProperties(properties);
}

export function trackEvent(
  eventName: string,
  eventParams: EventProperties | null | undefined = undefined,
  segmentation_event_param_keys: string[] | undefined | null = null,
  isInternalEvent: boolean = false
): Promise<void> {
  return NotiflySdk.trackEvent(
    eventName,
    eventParams,
    segmentation_event_param_keys,
    isInternalEvent
  );
}

/**
 * @deprecated Since version 2.3.0.
 */
export function notiflyBackgroundHandler(_remoteMessage: any): Promise<void> {
  console.warn(
    'Warning: notifly.notiflyBackgroundHandler(remoteMessage) is deprecated and will be removed in the next major release. You do not need to call this method anymore. remoteMessage is now handled automatically.'
  );
  return Promise.resolve();
}

/**
 * @deprecated Since version 2.3.0.
 */
export function setNotiflyBackgroundMessageHandler(): Promise<void> {
  console.warn(
    'Warning: notifly.setNotiflyBackgroundMessageHandler() is deprecated and will be removed in the next major release. You do not need to call this method anymore. remoteMessage is now handled automatically.'
  );
  return Promise.resolve();
}

const notifly = {
  initialize,
  setUserId,
  setUserProperties,
  trackEvent,
  notiflyBackgroundHandler,
  setNotiflyBackgroundMessageHandler,
};

export default notifly;
