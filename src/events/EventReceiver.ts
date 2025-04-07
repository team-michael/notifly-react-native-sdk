import { NativeEventEmitter, type NativeModule } from 'react-native';
import { EventNames } from '../constants';

type EventListener = (event: any) => void;

export default class EventReceiver {
  private nativeNotiflySdk: NativeModule;
  private notiflyEventEmitter: NativeEventEmitter;
  private eventListenerArrayMap: Map<string, Array<EventListener>> = new Map();

  constructor(nativeNotiflySdk: NativeModule) {
    this.nativeNotiflySdk = nativeNotiflySdk;
    this.notiflyEventEmitter = new NativeEventEmitter(this.nativeNotiflySdk);
  }

  addEventListener<T>(eventName: string, handler: (event: T) => void) {
    const existings = this.eventListenerArrayMap.get(eventName);
    if (existings && existings.length > 0) {
      existings.push(handler);
    } else {
      this.eventListenerArrayMap.set(eventName, [handler]);
      this.notiflyEventEmitter.addListener(eventName, (event) => {
        const listeners = this.eventListenerArrayMap.get(eventName);
        if (listeners) {
          listeners.forEach((listener) =>
            listener(this.transformEventAccordingToType(eventName, event))
          );
        }
      });
    }
  }

  removeEventListener<T>(eventName: string, handler: (event: T) => void) {
    const existings = this.eventListenerArrayMap.get(eventName);
    if (existings) {
      const index = existings.indexOf(handler);
      if (index !== -1) {
        existings.splice(index, 1);
      }
    }
  }

  private transformEventAccordingToType(eventName: string, payload: any) {
    if (eventName === EventNames.NOTIFICATION_CLICKED) {
      // Transform rawPayload as Object as it is stringified in native code
      const raw = payload?.notification?.rawPayload;
      try {
        return raw && typeof raw === 'string'
          ? {
              ...payload,
              notification: {
                ...payload.notification,
                rawPayload: JSON.parse(raw),
              },
            }
          : payload;
      } catch (e) {
        console.error(
          '[Notifly React Native SDK] Error while parsing rawPayload. Payload will be returned as is.', e
        );
        return payload;
      }
    }

    return payload;
  }
}
