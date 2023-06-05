import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import LoginPage from './LoginPage';
import HomePage from './HomePage';
import MyPage from './MyPage';
import EventPage from './EventPage';

const linking = {
  prefixes: ['pushnotiflyrn://'],
  config: {
    screens: {
      Login: 'Login',
      Home: 'Home',
      MyPage: 'MyPage',
      EventPage: 'EventPage',
    },
  },
};

const Stack = createStackNavigator();

export default function App() {
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    const requestPermission = async () => {
      await messaging().requestPermission();
    };
    requestPermission();
  }, [result]);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen component={LoginPage} name="Login" />
        <Stack.Screen component={HomePage} name="Home" />
        <Stack.Screen component={MyPage} name="MyPage" />
        <Stack.Screen component={EventPage} name="EventPage" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
