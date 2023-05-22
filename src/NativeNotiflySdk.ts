import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  initialize(
    projectId: string,
    username: string,
    password: string
  ): Promise<void>;
  setUserId(userId: string | undefined): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NotiflySdk');
