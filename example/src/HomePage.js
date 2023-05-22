import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import notifly from 'notifly-sdk';

const handleClick = async (eventName) => {
  await notifly.trackEvent(eventName);
  console.log('eventName', eventName);
};

function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to HomePage!</Text>
      <View style={styles.button}>
        <Button
          title="homepage_visit"
          onPress={() => {
            handleClick('homepage_visit');
          }}
          color="#777777"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="event1"
          onPress={() => {
            handleClick('event1');
          }}
          color="#888444"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="event2"
          onPress={() => {
            handleClick('event2');
          }}
          color="#123456"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="event3"
          onPress={() => {
            handleClick('event3');
          }}
          color="#456789"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="event4"
          onPress={() => {
            handleClick('event4');
          }}
          color="#159456"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="event5"
          onPress={() => {
            handleClick('event5');
          }}
          color="#357644"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="event6"
          onPress={() => {
            handleClick('event6');
          }}
          color="#841584"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Go to LoginPage"
          onPress={() => {
            navigation.navigate('Login');
          }}
          color="#000000"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Go to MyPage"
          onPress={() => {
            navigation.navigate('MyPage');
          }}
          buttonStyle={styles.button}
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
  welcomeText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default HomePage;
