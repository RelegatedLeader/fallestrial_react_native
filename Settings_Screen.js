import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Define your screens
//uses the navigation!
const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.layout}>
      <ScrollView>
        <Text style={styles.headerText}>Settings</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('PersonalSettings')}
        >
          <Text style={styles.optionText}>Personal Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('PaymentSettings')}
        >
          <Text style={styles.optionText}>Payment Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('CustomSettings')}
        >
          <Text style={styles.optionText}>Custom Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const PersonalSettingsScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.headerText}>Personal Settings</Text>
      {/* Add your content for the Personal Settings screen here */}
    </View>
  );
};

const PaymentSettingsScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.headerText}>Payment Settings</Text>
      {/* Add your content for the Payment Settings screen here */}
    </View>
  );
};

const CustomSettingsScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.headerText}>Custom Settings</Text>
      {/* Add your content for the Custom Settings screen here */}
    </View>
  );
};

// Create a stack navigator--> it is another way to create it
const AppNavigator = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        header: null, // Remove the header for the Settings screen
      },
    },
    PersonalSettings: {
      screen: PersonalSettingsScreen,
      navigationOptions: {
        header: null, // Remove the header for PersonalSettings screen
      },
    },
    PaymentSettings: {
      screen: PaymentSettingsScreen,
      navigationOptions: {
        header: null, // Remove the header for PaymentSettings screen
      },
    },
    CustomSettings: {
      screen: CustomSettingsScreen,
      navigationOptions: {
        header: null, // Remove the header for CustomSettings screen
      },
    },
  },
  {
    initialRouteName: 'Settings', // Set the initial route to 'Settings'
  }
);

// Create the app container
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#0a355a',
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#178785',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
