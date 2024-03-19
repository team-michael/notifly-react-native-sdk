export * from './notification';

export interface InitializeParams {
  projectId: string;
  username: string;
  password: string;
}

export interface UserProperties {
  [key: string]: any;
}

export interface EventProperties {
  [key: string]: any;
}
