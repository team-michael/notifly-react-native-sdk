import type { InAppMessageEvent } from '../types';

jest.unmock('react-native/Libraries/EventEmitter/NativeEventEmitter');

const fixtures: InAppMessageEvent[] = [
  { eventName: 'in_app_message_show', eventParams: null },
  {
    eventName: 'main_button_click',
    eventParams: { campaign_id: 'campaign', link: 'app://home' },
  },
  { eventName: 'close_button_click', eventParams: { button_name: 'close' } },
  {
    eventName: 'hide_in_app_message_button_click',
    eventParams: { button_name: 'hide' },
  },
  {
    eventName: 'survey_submit_button_click',
    eventParams: { notifly_extra_data: { answers: ['yes', null, 2, true] } },
  },
];

beforeEach(() => jest.resetModules());
afterEach(() => {
  require('react-native').DeviceEventEmitter.removeAllListeners();
  jest.restoreAllMocks();
});

function loadSdk(platform: 'android' | 'ios') {
  const rn = require('react-native') as typeof import('react-native');
  rn.Platform.OS = platform;
  rn.NativeModules.NotiflyReactNativeSdk = {
    addListener: jest.fn(),
    removeListeners: jest.fn(),
    addNotificationClickListener: jest.fn(),
  };
  const sdk = require('../index') as typeof import('../index');
  return { sdk, rn };
}

describe.each(['android', 'ios'] as const)('%s popup listener', (platform) => {
  it.each(fixtures)('delivers $eventName without changing its payload', (event) => {
    const { sdk, rn } = loadSdk(platform);
    expect(sdk.addInAppMessageEventListener).toEqual(expect.any(Function));
    expect(sdk.default.addInAppMessageEventListener).toBe(
      sdk.addInAppMessageEventListener
    );
    const listener = jest.fn();
    const subscription = sdk.addInAppMessageEventListener(listener);
    rn.DeviceEventEmitter.emit('Notifly#InAppMessageEvent', event);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
    subscription.remove();
    rn.DeviceEventEmitter.emit('Notifly#InAppMessageEvent', event);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('removes subscriptions independently and does not duplicate re-registration', () => {
    const { sdk, rn } = loadSdk(platform);
    const listener = jest.fn();
    const first = sdk.addInAppMessageEventListener(listener);
    const second = sdk.addInAppMessageEventListener(listener);
    first.remove();
    first.remove();
    rn.DeviceEventEmitter.emit('Notifly#InAppMessageEvent', fixtures[0]);
    expect(listener).toHaveBeenCalledTimes(1);
    second.remove();
    const third = sdk.addInAppMessageEventListener(listener);
    rn.DeviceEventEmitter.emit('Notifly#InAppMessageEvent', fixtures[0]);
    expect(listener).toHaveBeenCalledTimes(2);
    third.remove();
    expect(rn.DeviceEventEmitter.listenerCount('Notifly#InAppMessageEvent')).toBe(0);
  });
});

it('keeps notification clicks Android-only when the iOS emitter is enabled', async () => {
  const { sdk, rn } = loadSdk('ios');
  jest.spyOn(console, 'error').mockImplementation(() => {});
  const listener = jest.fn();
  await sdk.addNotificationClickListener(listener);
  rn.DeviceEventEmitter.emit('Notifly#NotificationClicked', { notification: {} });
  expect(listener).not.toHaveBeenCalled();
  expect(
    rn.NativeModules.NotiflyReactNativeSdk.addNotificationClickListener
  ).not.toHaveBeenCalled();
});
