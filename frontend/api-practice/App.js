import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

// function to use the stored userID to retrieve a JSON containing information
async function getUser() {
  console.log("Retrieving userID...");
	const userID = await AsyncStorage.getItem('userID');
  console.log("Retrieved userID...",userID);
  console.log("Sending API request...");
	const response = await fetch(`http://localhost:8080/api/users?id=${userID}`);
  console.log("Awaiting API response...");
	const user = await response.json();
  console.log("Retrieved API response...");
	return user;
}

// App Rendering
export default function App() {
  storeUserID('000000000000001');
  let user = getUser();
  //figure out how to wait until this is done
  //I'm so close- api returns valid json, react just renders too early
  //maybe there's a way to wait until done, or live render?
  console.log(user);
  console.log(user.ID);
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
