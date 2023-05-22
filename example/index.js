import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { NOTIFLY_PROJECT_ID, NOTIFLY_USERNAME, NOTIFLY_PASSWORD } from '@env';
import { initialize } from 'notifly-sdk';

initialize(NOTIFLY_PROJECT_ID, NOTIFLY_USERNAME, NOTIFLY_PASSWORD);
AppRegistry.registerComponent(appName, () => App);
