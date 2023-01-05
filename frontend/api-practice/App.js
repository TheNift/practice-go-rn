import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// function to store userID value globally across app
const storeUserID = async (value) => {
	try {
		await AsyncStorage.setItem('userID', value);
    console.log("Stored userID...");
	} catch (error) {
		console.log("Error storing userID");
	}
}

// function to make API call
function requestUser(userID) {
  return new Promise(resolve => {
    setTimeout(() => {
      const response = fetch(`http://localhost:8080/api/users?id=${userID}`);
      resolve(response);
    }, 2000);
  });
}

// function to use the stored userID to retrieve a JSON containing information
async function getUser() {
  console.log("Retrieving userID...");
	const userID = await AsyncStorage.getItem('userID');
  console.log("Retrieved userID...");
  console.log("Sending API request...");
	// const response = await fetch(`http://localhost:8080/api/users?id=${userID}`);
  const response = await requestUser(userID);
	const user = await response.json();
  console.log("Response recieved: ", user);
  console.log("Retrieved API response...");
	return user;
}

// App Rendering
export default function App() {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);

  const prepUserData = () => {
    storeUserID('837645918231');
    console.log("Starting getUser Process...");
    console.log("===========================");
    getUser().then(response => {
      setUser(response);
      console.log("===========================");
      console.log("Ending getUser Process...");
      setLoading(false);
    });
  };

  useEffect(() => {
    prepUserData();
  }, []);

  if (isLoading) {
    return (
      <View className="App">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>ID: {user.id} </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
