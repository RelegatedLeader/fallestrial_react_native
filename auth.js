// auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LogOut = async () => {
  await AsyncStorage.setItem('isLoggedIn', 'false');
  alert('You have been logged out');
};
