import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { NOTIFLY_PROJECT_ID, NOTIFLY_USERNAME, NOTIFLY_PASSWORD } from '@env';
import notifly from 'notifly-sdk';

notifly.disableInAppMessage();
notifly.initialize(
  NOTIFLY_PROJECT_ID,
  NOTIFLY_USERNAME,
  NOTIFLY_PASSWORD,
  false
);
notifly.setLogLevel(2);
// deprecated method call test
notifly.setNotiflyBackgroundMessageHandler();
AppRegistry.registerComponent(appName, () => App);
