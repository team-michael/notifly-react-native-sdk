import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { type UserProperties } from './types';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  initialize(
    projectId: string,
    username: string,
    password: string
  ): Promise<void>;
  setUserId(userId: string | undefined): Promise<void>;
  setUserProperties(userProperties: UserProperties): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NotiflySdk');
