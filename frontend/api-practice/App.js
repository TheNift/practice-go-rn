import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      // this fetch needs to be the IP of the server host: for my personal test rig that's my device IP
      resolve(fetch(`http://192.168.0.48:8080/api/users?id=${userID}`)
        .then(response => response.json())  
        .catch(error => {
          console.error(error);
        })
      );
    }, 0); //adjust this time to wait before making request (for debugging)
  });
}

// function to use the stored userID to retrieve a JSON containing information
async function getUser() {
  console.log("Retrieving userID...");
	const userID = await AsyncStorage.getItem('userID');
  console.log("Retrieved userID...");
  console.log("Sending API request...");
  const user = await requestUser(userID);
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
      <SafeAreaView  style={styles.containerLoading}>
        <StatusBar style="auto" />
        <Text>Loading...</Text>
      </SafeAreaView >
    );
  }

  return (
    <SafeAreaView style={styles.containerLoaded}>
      <StatusBar style="auto" />
      <Text>ID: {user.id} </Text>
      <Text>First Name: {user.first_name} </Text>
      <Text>Last Name: {user.last_name} </Text>
      <Text>Email: {user.email} </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    backgroundColor: '#D62828',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  containerLoaded: {
    flex: 1,
    backgroundColor: '#A3B18A',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
});
