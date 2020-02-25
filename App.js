import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "./Home";
import { NewRotiScreen } from "./Roti";
import { ResultScreen } from "./Result";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={{ colors: { background: "papayawhip" } }}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Roti" component={NewRotiScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
