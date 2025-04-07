## Example app for Notifly React Native SDK

## .env file

Create .env file with this format.

```.env
NOTIFLY_PROJECT_ID=
NOTIFLY_USERNAME=
NOTIFLY_PASSWORD=
```

### Android

Make sure you have `google-services.json` under `/example` or `/example/android/app`. Package name: `com.notiflysdkexample`.
Link to get the `google-services.json`: [Firebase Project Settings](https://console.firebase.google.com/u/0/project/ios-test-app-f6e0e/settings/general/android:com.notiflysdkexample?nonce=1684713917910)

```
yarn example android
```


### iOS

Make sure you have `GoogleService-Info.plist` under `/example` or `/example/ios`.
Link to get the `GoogleService-Info.plist`: [Firebase Project Settings](https://console.firebase.google.com/u/0/project/ios-test-app-f6e0e/settings/general/ios:org.reactjs.native.example.NotiflySdkExample)

```
cd ios
pod install
```
