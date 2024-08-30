import { NOTIFLY_PROJECT_ID, NOTIFLY_USERNAME, NOTIFLY_PASSWORD } from '@env';

import { AppRegistry, Platform } from 'react-native';
import AppWrapper from './src/AppWrapper';
import { name as appName } from './app.json';

import notifly from 'notifly-sdk';

if (Platform.OS === 'android') {
  notifly.setLogLevel(2);
}

notifly.initialize({
  projectId: NOTIFLY_PROJECT_ID,
  username: NOTIFLY_USERNAME,
  password: NOTIFLY_PASSWORD,
});
notifly.setUserId('rn_test_user');

console.log('Adding notification click listener');
notifly.addNotificationClickListener((notification) => {
  console.log(
    'Notification clicked:',
    notification.notification.rawPayload,
    typeof notification.notification.rawPayload
  );
});

AppRegistry.registerComponent(appName, () => AppWrapper);
