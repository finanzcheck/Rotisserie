import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewRotiScreen from "./Roti";

const key = "Rotis";

const _storeData = async () => {
  try {
    await AsyncStorage.setItem(key, 'I like to save it.');
  } catch (error) {
    // Error saving data
  }
};

const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};

function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button onPress={_storeData}  title="Save"/>
        <Button onPress={_retrieveData} title="Get"/>
        <Button
            title="Go to Roti"
            onPress={() => navigation.navigate('Roti')}
        />
      </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Roti" component={NewRotiScreen} />
        </Stack.Navigator>
      </NavigationContainer>
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
