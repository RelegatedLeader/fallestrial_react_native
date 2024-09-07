import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const SocialMedia = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}></Text>
      <WebView
        source={{ uri: 'https://www.facebook.com' }}
        style={styles.webview}
        bounces={false}
        scrollEnabled={false}
        androidHardwareAccelerationDisabled={false}
        contentMode={'mobile'}
        cacheMode={'LOAD_CACHE_ELSE_NETWORK'} // You can experiment with different cache modes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  webview: {
    flex: 1,
  },
});

export default SocialMedia;
