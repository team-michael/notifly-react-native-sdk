import { NativeModules, Platform } from 'react-native';

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
  password: string
): Promise<void> {
  return NotiflySdk.initialize(projectId, username, password);
}

const notifly = {
  initialize,
};

export default notifly;
