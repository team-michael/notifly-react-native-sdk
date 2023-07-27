import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import notifly from 'notifly-sdk';

const WebPage = ({ url }) => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} />
    </View>
  );
};

const WebviewApp = ({ setAppMode }) => {
  const url = 'https://notifly.tech/webview-testpage'; // 보여주고 싶은 웹 페이지 URL로 변경해주세요.
  React.useEffect(() => {
    notifly.disableInAppMessage();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Go to Login Page"
        style={{ margin: 10 }}
        onPress={() => {
          setAppMode('MAIN');
        }}
      />
      <View style={styles.container}>
        <WebPage url={url} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WebviewApp;
