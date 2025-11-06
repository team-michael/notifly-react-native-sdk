import { type TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  initialize(
    projectId: string,
    username: string,
    password: string
  ): Promise<void>;
  setUserId(userId: string | null | undefined): Promise<void>;
  setUserProperties(userProperties: Object): Promise<void>;
  setEmail(email: string): Promise<void>;
  setPhoneNumber(phoneNumber: string): Promise<void>;
  setTimezone(timezone: string): Promise<void>;
  getNotiflyUserId(): Promise<string | null>;
  trackEvent(
    eventName: string,
    eventParams: Object | null | undefined,
    segmentationEventParamKeys: string[] | undefined | null
  ): Promise<void>;
  setLogLevel(logLevel: number): Promise<void>;
  disableInAppMessage(): Promise<void>;
  addNotificationClickListener(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NotiflyReactNativeSdk');
