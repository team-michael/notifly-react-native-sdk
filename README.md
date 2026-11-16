# Notifly React Native SDK

![npm](https://img.shields.io/npm/v/notifly-sdk)
![Downloads](https://img.shields.io/npm/dt/notifly-sdk)

_Notifly SDK for React Native_ is an easy-to-use package for integrating Notifly with your React Native applications. It supports both Android and iOS platforms.

## Installation

To install the package, run the following command:

```
npm install notifly-sdk@latest --save
```

or

```
yarn add notifly-sdk@latest
```

## Usage

Please refer to our official documentation: 

* [English documentation](https://docs.notifly.tech/developer-guide/client-sdk/react-native-sdk)
* [Korean documentation](https://docs.notifly.tech/ko/developer-guide/client-sdk/react-native-sdk)

### In-app popup events

After initializing the SDK, subscribe on Android or iOS:

```tsx
useEffect(() => {
  const subscription = notifly.addInAppMessageEventListener((event) => {
    console.log(event.eventName, event.eventParams);
  });
  return () => subscription.remove();
}, []);
```

The API is also available as a named export. Events use the native SDK's names
and payloads unchanged; `eventParams` can be `null`. Each subscription is removed
independently. Register before triggering a popup; past events are not replayed.
