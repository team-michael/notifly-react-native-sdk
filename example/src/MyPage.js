import React, { useState } from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import notifly from 'notifly-sdk';

function MyPage({ navigation }) {
  const [userID, setUserID] = useState(undefined);

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [timezone, setTimezone] = useState('');

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleClickSetUserId = async () => {
    console.log('userID', userID);
    await notifly.setUserId(userID);
  };

  const handleRemoveUserId = async () => {
    console.log('handleRemoveUserId');
    await notifly.setUserId();
  };

  const handleClickSetUserProperties = async () => {
    console.log(`handleClickSetUserProperties ${key}: ${value}`);
    await notifly.setUserProperties({
      [key]: value,
    });
  };

  const handleClickSetEmail = async () => {
    console.log(`handleClickSetEmail ${email}`);
    await notifly.setEmail(email);
  };

  const handleClickSetPhoneNumber = async () => {
    console.log(`handleClickSetPhoneNumber ${phoneNumber}`);
    await notifly.setPhoneNumber(phoneNumber);
  };

  const handleClickSetTimezone = async () => {
    console.log(`handleClickSetTimezone ${timezone}`);
    await notifly.setTimezone(timezone);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.welcomeText}>This is MyPage</Text>
      <Text>Current userID: {userID}</Text>
      <TextInput
        style={styles.input}
        value={userID}
        onChangeText={(text) => setUserID(text)}
      />
      <View style={styles.button}>
        <Button
          title="set_user_id"
          onPress={handleClickSetUserId}
          color="#841584"
        />
      </View>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.button}>
        <Button
          title="Set Email"
          onPress={handleClickSetEmail}
          color="#841584"
        />
      </View>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <View style={styles.button}>
        <Button
          title="Set Phone Number"
          onPress={handleClickSetPhoneNumber}
          color="#841584"
        />
      </View>
      <TextInput
        style={styles.input}
        value={timezone}
        onChangeText={(text) => setTimezone(text)}
      />
      <View style={styles.button}>
        <Button
          title="Set Timezone"
          onPress={handleClickSetTimezone}
          color="#841584"
        />
      </View>
      <Text style={styles.padding} />
      <Text style={styles.label}>Key</Text>
      <TextInput
        style={styles.input}
        value={key}
        onChangeText={(text) => setKey(text)}
      />
      <Text style={styles.label}>Value</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <View style={styles.button}>
        <Button
          title="set_user_properties"
          onPress={handleClickSetUserProperties}
          color="#841584"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="remove_user_id"
          onPress={handleRemoveUserId}
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
    </ScrollView>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    width: '80%',
    marginTop: 15,
    marginBottom: 15,
  },
  padding: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default MyPage;
