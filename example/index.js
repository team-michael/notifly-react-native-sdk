import { NOTIFLY_PROJECT_ID, NOTIFLY_USERNAME, NOTIFLY_PASSWORD } from '@env';

import { AppRegistry, Platform } from 'react-native';
import AppWrapper from './src/AppWrapper';
import { name as appName } from './app.json';

import notifly from 'notifly-sdk';

notifly.initialize({
  projectId: NOTIFLY_PROJECT_ID,
  username: NOTIFLY_USERNAME,
  password: NOTIFLY_PASSWORD,
});

if (Platform.OS === 'android') {
  notifly.setLogLevel(2);
}

AppRegistry.registerComponent(appName, () => AppWrapper);
