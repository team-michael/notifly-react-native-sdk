import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import notifly from 'notifly-sdk';

function EventPage({ navigation }) {
    const [eventName, setEventName] = useState(undefined);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [eventParams, setEventParams] = useState({});
    const [segmentationEventParamKeys, setSegmentationEventParamKeys] = useState([]);

    const handleTrackEvent = async () => {
        await notifly.trackEvent(eventName, eventParams, segmentationEventParamKeys);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>This is event tracking page</Text>
            <Text>EventName</Text>
            <TextInput
                style={styles.input}
                value={eventName}
                onChangeText={(text) => setEventName(text)}
            />
            <Text>EventParams-Key</Text>
            <TextInput
                style={styles.input}
                value={key}
                onChangeText={(text) => setKey(text)}
            />
            <Text>EventParams-Value</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
            <View style={styles.button}>
                <Button
                    title="add event param"
                    onPress={() => {
                        setEventParams({ ...eventParams, [key]: value });
                    }}
                    color="#841584"
                />
            </View>
            <Text>segmentationEventParamKeys</Text>
            <TextInput
                style={styles.input}
                value={segmentationEventParamKeys}
                onChangeText={(text) => setSegmentationEventParamKeys(text)}
            />
            <Text>Current Event Params</Text>
            {Object.keys(eventParams).map((key) => (
                <Text key={key} styles={{ marginVertical: '1%', fontSize: 10 }}>
                    {key}: {eventParams[key]}
                </Text>
            ))}


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

export default EventPage;
