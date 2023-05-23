import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { type UserProperties, type EventProperties } from './types';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  initialize(
    projectId: string,
    username: string,
    password: string,
    useCustomClickHandler: boolean | undefined
  ): Promise<void>;
  setUserId(userId: string | undefined): Promise<void>;
  setUserProperties(userProperties: UserProperties): Promise<void>;
  trackEvent(
    eventName: string,
    eventParams: EventProperties | null | undefined,
    segmentation_event_param_keys: string[] | undefined | null,
    isInternalEvent: boolean
  ): Promise<void>;
  notiflyBackgroundHandler(_remoteMessage: any): Promise<void>;
  setNotificationOpenedHandler(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NotiflySdk');
