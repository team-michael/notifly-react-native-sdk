import { AppRegistry } from 'react-native';
import App from './src/App';
import WebviewApp from './src/WebviewApp';
import { name as appName } from './app.json';
import {
  NOTIFLY_PROJECT_ID,
  NOTIFLY_USERNAME,
  NOTIFLY_PASSWORD,
  TEST_APP_MODE,
} from '@env';
import notifly from 'notifly-sdk';

if (TEST_APP_MODE === 'WEBVIEW') {
  notifly.disableInAppMessage();
}

notifly.initialize(
  NOTIFLY_PROJECT_ID,
  NOTIFLY_USERNAME,
  NOTIFLY_PASSWORD,
  false
);
notifly.setLogLevel(2);
// deprecated method call test
notifly.setNotiflyBackgroundMessageHandler();

if (TEST_APP_MODE === 'WEBVIEW') {
  AppRegistry.registerComponent(appName, () => WebviewApp);
} else {
  AppRegistry.registerComponent(appName, () => App);
}
