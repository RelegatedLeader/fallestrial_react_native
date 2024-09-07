import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const NewsPage = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore Britannica News</Text>
      <WebView
        source={{ uri: 'https://www.britannica.com/news' }}
        onLoadEnd={() => setIsLoaded(true)} // Use onLoadEnd instead of onLoad
        style={styles.webview}
        bounces={false}
        scrollEnabled={false}
        androidHardwareAccelerationDisabled={false}
        contentMode={'mobile'}
        cacheMode={'LOAD_CACHE_ELSE_NETWORK'}
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

export default NewsPage;
