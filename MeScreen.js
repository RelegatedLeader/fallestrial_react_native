import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

const ChoicesScreen = ({ route }) => {
  const { selectedChoices } = route.params;
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.layout}>
      <Text style={styles.title}>Your Choices</Text>
      {selectedChoices.map((choice) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Crypto')}
          key={choice}
          style={styles.choiceButton}
        >
          <Text style={styles.choiceButtonText}>{choice}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default function MeScreen({ navigation }) {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [choicesLocked, setChoicesLocked] = useState(false);
  const [firstTimeUser, setFirstTimeUser] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(true);

  useEffect(() => {
    // Check if the choices are locked in AsyncStorage
    checkLockStatus();
  }, []);

  const contentChoices = [
    'Crypto',
    'Social Media',
    'News + Interaction',
    'Stocks',
    'AI',
    'Web3 Gaming',
    'Therapies',
    'Education',
    'MeetUps',
    'Literature',
  ];

  const toggleChoice = (choice) => {
    if (!choicesLocked && firstTimeUser) {
      if (selectedChoices.includes(choice)) {
        // If the choice is already selected, remove it from the list
        setSelectedChoices(selectedChoices.filter((item) => item !== choice));
      } else if (selectedChoices.length < 5) {
        // If less than 5 choices are selected, add the choice
        setSelectedChoices([...selectedChoices, choice]);
      }
    }
  };

  const checkLockStatus = async () => {
    try {
      const isLocked = await AsyncStorage.getItem('choicesLocked');
      if (isLocked === 'true') {
        setChoicesLocked(true);
        setFirstTimeUser(false);
      }
    } catch (error) {
      console.error('Error checking lock status:', error);
    }
  };

  const lockChoices = async () => {
    try {
      // Lock the choices and save the lock status in AsyncStorage
      await AsyncStorage.setItem('choicesLocked', 'true');
      setChoicesLocked(true);
      setFirstTimeUser(false);
    } catch (error) {
      console.error('Error locking choices:', error);
    }
  };

  const resetChoices = () => {
    // Reset the choices and unlock them
    setChoicesLocked(false);
    setFirstTimeUser(true);
    setSelectedChoices([]);
    setNotificationVisible(true);
  };

  const handleNotif1 = () => {
    // Handle your notification logic here
    // For now, let's just hide the notification when the button is clicked
    setNotificationVisible(false);
  };

  const handleChoiceNavigation = (choice) => {
    // Navigate to the Choices screen with selected choices
    if (navigation) {
      navigation.navigate('Choices', { selectedChoices });
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name='Me' options={{ headerShown: false }}>
        {() => (
          <ScrollView contentContainerStyle={styles.layout}>
            <Text style={styles.title}>@ME</Text>
            {firstTimeUser ? (
              <View>
                <Text style={styles.selectionCount}>
                  {selectedChoices.length}/5 options selected
                </Text>
                {contentChoices.map((choice) => (
                  <TouchableOpacity
                    key={choice}
                    style={[
                      styles.choice,
                      selectedChoices.includes(choice) && styles.selectedChoice,
                    ]}
                    onPress={() => toggleChoice(choice)}
                  >
                    <Text style={styles.choiceText}>{choice}</Text>
                  </TouchableOpacity>
                ))}
                {selectedChoices.length === 5 && (
                  <TouchableOpacity
                    style={styles.lockButton}
                    onPress={lockChoices}
                  >
                    <Text style={styles.lockButtonText}>Lock Choices</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={handleNotif1}
                  style={[
                    styles.notification,
                    !notificationVisible && { display: 'none' },
                  ]}
                >
                  <Text style={styles.notificationText}>
                    Choices are locked for now. You can't change them until
                    months have passed.
                  </Text>
                </TouchableOpacity>
                {choicesLocked && (
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetChoices}
                  >
                    <Text style={styles.resetButtonText}>Reset Choices</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            <View style={styles.choicesList}>
              {selectedChoices.map((choice) => (
                <TouchableOpacity
                  key={choice}
                  onPress={() => handleChoiceNavigation(choice)}
                >
                  <Text style={styles.selectedChoiceText}>{choice}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </Stack.Screen>
      <Stack.Screen name='Choices' component={ChoicesScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    backgroundColor: '#0a355a',
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
  },
  selectionCount: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  choice: {
    backgroundColor: '#22becf',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    alignItems: 'center',
  },
  selectedChoice: {
    backgroundColor: '#15a2cc',
  },
  choiceText: {
    color: 'white',
  },
  lockButton: {
    backgroundColor: '#15a2cc',
    padding: 10,
    borderRadius: 5,
    marginVertical: 16,
    alignItems: 'center',
  },
  lockButtonText: {
    color: 'white',
  },
  notification: {
    backgroundColor: 'red', // Change to yellow if not visible
    padding: 10,
    borderRadius: 5,
    marginVertical: 16,
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  choicesList: {
    marginTop: 16,
  },
  selectedChoiceText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 8,
  },
  choiceButton: {
    backgroundColor: 'green', // Choose your preferred background color
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    alignItems: 'center',
  },
  choiceButtonText: {
    color: 'white',
  },
  resetButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
  },
});
