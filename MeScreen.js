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
  ScrollView,
} from 'react-native';

//
export default function MeScreen() {
  return (
    <View style={styles.layout}>
      <ScrollView>
        <Text style={{ color: 'white', fontSize: 32, textAlign: 'center' }}>
          @ME
        </Text>


        
      </ScrollView>
    </View>
  );
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
    //width: width / 2,
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
