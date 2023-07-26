import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebPage = ({ url }) => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} />
    </View>
  );
};

const WebviewApp = () => {
  const url = 'https://notifly.tech/webview-testpage'; // 보여주고 싶은 웹 페이지 URL로 변경해주세요.

  return (
    <View style={styles.container}>
      <WebPage url={url} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebviewApp;
