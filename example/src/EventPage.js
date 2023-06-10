import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import notifly from 'notifly-sdk';

function EventPage({ navigation }) {
  const [eventName, setEventName] = useState(undefined);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [eventParams, setEventParams] = useState({});
  const [segmentationEventParamKeys, setSegmentationEventParamKeys] = useState(
    []
  );

  const handleTrackEvent = async () => {
    await notifly.trackEvent(
      eventName,
      eventParams,
      segmentationEventParamKeys
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>This is event tracking page</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Event Name</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={(text) => setEventName(text)}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Event Params</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: '5%',
          marginHorizontal: '3%',
        }}
      >
        <View style={{ width: '40%', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>Key</Text>
          <TextInput
            style={styles.key_value_input}
            value={key}
            onChangeText={(text) => setKey(text)}
          />
        </View>
        <View
          style={{
            width: '40%',
            justifyContent: 'center',
            marginHorizontal: '3%',
          }}
        >
          <Text style={{ textAlign: 'center' }}>Value</Text>
          <TextInput
            style={styles.key_value_input}
            value={value}
            onChangeText={(text) => setValue(text)}
          />
        </View>
      </View>
      <Button
        title="add event param"
        onPress={() => {
          setEventParams({ ...eventParams, [key]: value });
        }}
        color="#841584"
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Current Event Params
      </Text>
      {Object.keys(eventParams).map((key) => (
        <Text key={key} style={{ marginVertical: '1%', fontSize: 10 }}>
          {key}: {eventParams[key]}
        </Text>
      ))}
      <Text style={{ marginTop: '10%', fontSize: 20, fontWeight: 'bold' }}>
        SegmentationEventParamKeys
      </Text>
      <TextInput
        style={styles.input}
        value={segmentationEventParamKeys}
        onChangeText={(text) =>
          setSegmentationEventParamKeys([text == '' ? undefined : text])
        }
      />

      <View style={styles.button}>
        <Button
          title="Track Event"
          onPress={handleTrackEvent}
          color="#841584"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Go to Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
          color="#00AABB"
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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '5%',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  key_value_input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginTop: '5%',
    marginBottom: '5%',
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

export default EventPage;
