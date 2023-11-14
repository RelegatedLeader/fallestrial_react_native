import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main_screen from './usables';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

const Stack = createStackNavigator();

const Main_menu = () => {
  const navigation = useNavigation();
  const logo = require('./img/fallestial_logo_1.png');

  return (
    <View style={styles.login_logout}>
      <Image source={logo} style={{ width: '100%', height: 100 }} />
      <Button
        style={styles.customText}
        title='Press for Privacy'
        onPress={() => navigation.navigate('Main Menu Choices')}
      />
    </View>
  );
};

const Main_menu_choices = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.login_logout}>
      <Text style={{ color: 'white', fontSize: 30 }}>
        {' '}
        You are what you create {'\n'}
      </Text>
      <Button title=' Sign Up' onPress={() => navigation.navigate('Sign Up')} />
      <Text> {'\n'} </Text>
      <Button title=' Login' onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const Sign_up = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    same_password: '',
  });

  const validate_sign_up = async () => {
    if (
      formData.first_name === '' ||
      formData.last_name === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.same_password === ''
    ) {
      alert('Fill in all the required fields.');
    } else if (formData.password !== formData.same_password) {
      alert('The passwords do not match.');
    } else {
      // Save the user data to AsyncStorage
      saveUserData(formData);

      // Clear the form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        same_password: '',
      });

      alert('You are ready to be signed up.');
    }
  };

  const saveUserData = async (data) => {
    try {
      const existingData = await AsyncStorage.getItem('user_data');
      const userData = existingData ? JSON.parse(existingData) : [];
      userData.push(data);
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <View style={styles.login_logout}>
      <Text style={styles.label}>Enter your first name</Text>
      <TextInput
        value={formData.first_name}
        style={styles.input}
        placeholder='First Name'
        onChangeText={(text) => setFormData({ ...formData, first_name: text })}
      />
      <Text style={styles.label}>Enter your last name</Text>
      <TextInput
        value={formData.last_name}
        style={styles.input}
        placeholder='Last Name'
        onChangeText={(text) => setFormData({ ...formData, last_name: text })}
      />
      <Text style={styles.label}>Enter your email</Text>
      <TextInput
        value={formData.email}
        style={styles.input}
        placeholder='Email'
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <Text style={styles.label}>Enter your password</Text>
      <TextInput
        value={formData.password}
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      <Text style={styles.label}>Re-enter your password</Text>
      <TextInput
        value={formData.same_password}
        style={styles.input}
        placeholder='Re-enter Password'
        onChangeText={(text) =>
          setFormData({ ...formData, same_password: text })
        }
      />
      <Button title='Sign Up' onPress={validate_sign_up} />
    </View>
  );
};

const Log_in = () => {
  const navigation = useNavigation();
  let [text_input_value, setTextInputValue] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    const loggedIn = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  };

  const validateLogin = async () => {
    const usersData = await AsyncStorage.getItem('user_data');
    const users = usersData ? JSON.parse(usersData) : [];
    const user = users.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (user) {
      setIsLoggedIn(true);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      alert('Login successful');
    } else {
      alert('Login failed');
    }
  };

  function updateCurrentTime() {
    const currentTime = new Date();
    return currentTime;
  }

  const getGreeting = () => {
    const current_time = updateCurrentTime();
    const currentHour = current_time.getHours();
    let greeting = 'Good Morning!';

    //so it is done in a 24 hours method- military time, in theory!
    if (currentHour >= 12 && currentHour < 17) {
      greeting = 'Good Afternoon!';
    } else if (currentHour >= 17) {
      greeting = 'Good Evening!';
    }

    return greeting;
  };

  // Change in the function parameters to pass navigation as an argument
  const logged_in_menu = () => {
    const greeting = getGreeting();

    let handle_share_button = () => {
      if (text_input_value != '') {
        navigation.navigate('Main Screen');
      } else {
        alert('Please enter something to share or skip.');
      }
    };

    return (
      <View style={styles.login_logout}>
        <Text style={{ color: 'white' }}>{greeting}</Text>
        <Text style={{ color: 'white', marginTop: 10 }}>
          What are you feeling right now?
        </Text>
        <TextInput
          onChangeText={(text) => setTextInputValue(text)}
          style={[styles.input, { marginTop: 10 }]}
        />
        <Button title='Share' onPress={handle_share_button} />

        <Button
          style={{ marginBottom: 10, marginTop: 10 }}
          title='Skip Update'
          onPress={() => navigation.navigate('Main Screen')}
        ></Button>
      </View>
    );
  };

  const logOut = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.setItem('isLoggedIn', 'false');
    alert('You have been successfully logged out.');
  };

  return isLoggedIn ? (
    logged_in_menu()
  ) : (
    <View style={styles.login_logout}>
      <Text style={styles.label}>Enter your email:</Text>
      <TextInput
        value={loginData.email}
        style={styles.input}
        placeholder='Email'
        onChangeText={(text) => setLoginData({ ...loginData, email: text })}
      />

      <Text style={styles.label}>Enter your password:</Text>
      <TextInput
        value={loginData.password}
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        onChangeText={(text) => setLoginData({ ...loginData, password: text })}
      />

      <Button title='Sign in' onPress={validateLogin} />
    </View>
  );
};

export default function App() {
  const [loaded] = useFonts({
    PressStart2P: PressStart2P_400Regular,
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#0a355a' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName='Welcome'
        >
          <Stack.Screen name='Welcome' component={Main_menu} />
          <Stack.Screen
            name='Main Menu Choices'
            component={Main_menu_choices}
          />
          <Stack.Screen name='Sign Up' component={Sign_up} />
          <Stack.Screen name='Login' component={Log_in} />
          <Stack.Screen name='Main Screen' component={Main_screen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a355a',
    //paddingTop: StatusBar.currentHeight, // To push content below the status bar
  },
  layout: {
    flex: 1,
    backgroundColor: '#0a355a',
  },
  login_logout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a355a',
    color: 'white',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    color: 'black',
    marginTop: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  customText: {
    fontFamily: 'PressStart2P', // Use the font family name you provided in the useFonts function
    fontSize: 24, // Set your desired font size
    color: 'white',
  },
});
