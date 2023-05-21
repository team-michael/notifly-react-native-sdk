import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';

function MyPage({ navigation }) {
  const [userID, setUserID] = useState(undefined);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleClickSetUserId = async () => {
    console.log('userID', userID);
    //await notifly.setUserId(userID);
  };
  const handleRemoveUserId = async () => {
    console.log('handleRemoveUserId');
    // await notifly.setUserId();
  };
  const handleClickSetUserProperties = async () => {
    console.log('handleClickSetUserProperties');
    /* await notifly.setUserProperties({
      [key]: value,
    }); */
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>This is MyPage</Text>
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
      <Text style={styles.padding}></Text>
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
