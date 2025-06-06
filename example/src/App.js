import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import LoginPage from './LoginPage';
import HomePage from './HomePage';
import MyPage from './MyPage';
import EventPage from './EventPage';

const linking = {
  prefixes: ['pushnotiflyrn2://'],
  config: {
    screens: {
      Login: 'Login',
      Home: 'Home',
      MyPage: 'MyPage',
      EventPage: 'EventPage',
    },
  },
};

const Stack = createNativeStackNavigator();

export default function App({ setAppMode }) {
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
        <Stack.Screen
          component={(props) => (
            <LoginPage {...props} setAppMode={setAppMode} />
          )}
          name="Login"
        />
        <Stack.Screen component={HomePage} name="Home" />
        <Stack.Screen component={MyPage} name="MyPage" />
        <Stack.Screen component={EventPage} name="EventPage" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
