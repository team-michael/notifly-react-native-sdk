import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const handleClick = async () => {
  console.log('handleClick');
  // await notifly.trackEvent('loginpage_visit');
};

function LoginComponent({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="LoginPage_visit"
          onPress={handleClick}
          style={styles.button}
          color="#841584"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Go to Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
          color="#000000"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    width: '80%',
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default LoginComponent;
