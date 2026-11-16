export interface InAppMessageEvent {
  eventName: string;
  eventParams: Record<string, unknown> | null;
}

export type InAppMessageEventListener = (event: InAppMessageEvent) => void;

export interface InAppMessageSubscription {
  remove(): void;
}
