import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView, // Import ScrollView
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import MeScreen from './MeScreen';
import Friends_Screen from './Friends';
import Settings_Screen from './Settings_Screen';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export default function MainScreen(props) {
  // Import your image assets
  const logo = require('./img/fallestial_logo_1.png');
  const searchIcon = require('./img/teal_search_icon.png');
  const leftMenuIcon = require('./img/teal_menu_dots_left.png');

  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuTranslateX = useRef(new Animated.Value(-width)).current;

  const [posts, setPosts] = useState([]); // Array to store user posts
  const [newPost, setNewPost] = useState(''); // Input for new post
  const [selectedImages, setSelectedImages] = useState([]); // Selected images

  const navigation = useNavigation();

  useEffect(() => {
    // Any initialization code you want to add can go here.
  }, []);

  const handlePress = () => {
    alert('This button will search soon...');
    Vibration.vibrate(35);
  };

  const handleLeftPress = () => {
    setMenuVisible(!isMenuVisible);
    Vibration.vibrate(35);

    Animated.timing(menuTranslateX, {
      toValue: isMenuVisible ? -width : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);

    Animated.timing(menuTranslateX, {
      toValue: -width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePostButton = () => {
    if (newPost.trim() !== '') {
      // Add the new post to the posts array with a 5-second timer for deletion
      setPosts([...posts, { text: newPost, timestamp: Date.now() }]);
      setNewPost(''); // Clear the input
      setTimeout(() => handleDeletePost(Date.now()), 10000);
    }
  };

  const handleDeletePost = (timestamp) => {
    // Filter out the post with the given timestamp to delete it
    const updatedPosts = posts.filter((post) => post.timestamp !== timestamp);
    setPosts(updatedPosts);
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [3, 3],
    });

    if (!result.cancelled) {
      setSelectedImages([...selectedImages, result.uri]);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const logOut = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    navigation.navigate('Welcome'); // Navigate back to the Welcome screen
    alert('You have been successfully logged out.');
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseMenu}>
      <View style={styles.layout}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleLeftPress}>
            <Image source={leftMenuIcon} style={styles.menuIcon} />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} />
          <TouchableOpacity onPress={handlePress}>
            <Image source={searchIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.menuContainer,
            { transform: [{ translateX: menuTranslateX }] },
          ]}
        >
          {/* Add your menu items here */}
          <TouchableOpacity onPress={() => alert('this will be added soon')}>
            <Text style={{ color: 'white' }}>Me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert('this will be added soon')}>
            <Text style={{ color: 'white' }}>Payment Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('this will be added soon')}>
            <Text style={{ color: 'white' }}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => logOut()}>
            <Text style={{ color: 'white' }}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              // Customize your tab bar icons here
              // Make sure you have the appropriate image assets for each tab
              let icon;
              if (route.name === 'Home') {
                Vibration.vibrate(8);
                icon = focused
                  ? require('./img/home_active.png')
                  : require('./img/home_inactive.png');
              } else if (route.name === 'Me') {
                icon = focused
                  ? require('./img/me_active.png')
                  : require('./img/me_inactive.png');
              } else if (route.name === 'Friends') {
                icon = focused
                  ? require('./img/friends_active.png')
                  : require('./img/friends_inactive.png');
              } else if (route.name === 'Settings') {
                icon = focused
                  ? require('./img/settings_active.png')
                  : require('./img/settings_inactive.png');
              }
              return (
                <Image
                  source={icon}
                  style={{ width: 20, height: 20, tintColor: color }}
                />
              );
            },
          })}
        >
          <Tab.Screen options={{ headerShown: false }} name='Home'>
            {() => (
              <HomeScreen
                newPost={newPost}
                handlePostButton={handlePostButton}
                setNewPost={setNewPost}
                posts={posts}
                handleDeletePost={handleDeletePost}
                selectedImages={selectedImages} // Pass selectedImages as a prop
                selectImage={selectImage}
                setSelectedImages={setSelectedImages} // Pass setSelectedImages as a prop
                navigation={navigation}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            options={{ headerShown: false }}
            name='Me'
            component={Mescreen}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name='Friends'
            component={FriendsScreen}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name='Settings'
            component={SettingsScreen}
          />
        </Tab.Navigator>
      </View>
    </TouchableWithoutFeedback>
  );
}

function HomeScreen({
  newPost,
  handlePostButton,
  setNewPost,
  posts,
  handleDeletePost,
  selectedImages,
  selectImage,
  navigation,
  setSelectedImages,
}) {
  // State to keep track of the double-tap count
  const [doubleTapCount, setDoubleTapCount] = useState(0);

  // Function to handle double-tap on an image
  const handleDoubleTap = (index) => {
    // Remove the image at the specified index
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    // Vibrate to provide feedback
    Vibration.vibrate(35);
  };

  //logging out
  const logOut = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    navigation.navigate('Welcome'); // Navigate back to the Welcome screen
    alert('You have been successfully logged out.');
  };

  return (
    <ScrollView style={{ backgroundColor: '#0c345c', flex: 1 }}>
      <Text
        style={{
          fontSize: 24,
          color: 'white',
          textAlign: 'center',
        }}
      >
        What are you feeling right now?
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newPost}
          onChangeText={(text) => setNewPost(text)}
          placeholder='What are you feeling right now?'
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePostButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.selectImageButton} onPress={selectImage}>
        <Text style={styles.selectImageButtonText}>Select Image</Text>
      </TouchableOpacity>

      <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>
        Your posts!
      </Text>
      {selectedImages.map((image, index) => (
        <TouchableOpacity key={index} onPress={handleDoubleTap}>
          <Image source={{ uri: image }} style={styles.selectedImage} />
        </TouchableOpacity>
      ))}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postText}>{item.text}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePost(item.timestamp)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

function Mescreen() {
  return <MeScreen />;
}

function FriendsScreen() {
  return <Friends_Screen />;
}

function SettingsScreen() {
  return <Settings_Screen />;
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#0a355a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: '50%',
    height: 40,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width / 2,
    height: '100%',
    backgroundColor: '#333',
    padding: 10,
    zIndex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    color: 'black',
    marginTop: 10,
    marginRight: 10,
  },
  postButton: {
    backgroundColor: '#22becf',
    padding: 10,
    borderRadius: 5,
  },
  postButtonText: {
    color: 'white',
  },
  post: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  postText: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  selectedImage: {
    width: 500,
    height: 500,
    alignContent: 'center',
    display: 'flex',
  },
  selectImageButton: {
    backgroundColor: '#22becf',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  selectImageButtonText: {
    color: 'white',
  },
});
