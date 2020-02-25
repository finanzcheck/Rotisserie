import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View,
  Animated, Easing
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "./Home";
import NewRotiScreen from "./Roti";

const key = "Rotis";

const _storeData = async () => {
  try {
    await AsyncStorage.setItem(key, "I like to save it.");
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

const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const fakeRoti = () => ({
  id: 1,
  participants: Math.ceil(Math.random() * 100),
  date: Reflect.construct(Date, []),
  votes: Array(10)
    .fill(1)
    .map(() => Math.floor(Math.random() * (5 - 1 + 1) + 1))
});

const VOTE_MAP = {
  1: { score: 10, color: "red" },
  2: { score: 30, color: "orange" },
  3: { score: 50, color: "yellow" },
  4: { score: 80, color: "lightgreen" },
  5: { score: 100, color: "green" }
};

const BouncyBar = props => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: props.height,
        easing: Easing.bounce,
      duration: 1000
    }).start();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        height: fadeAnim
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const Statistics = ({ navigation }) => {
  const { rotis } = {
    rotis: Array(30)
      .fill({})
      .map(fakeRoti)
  };

  const scores = rotis.map(r =>
    Math.round(r.votes.reduce((sum, vote) => sum + vote) / r.votes.length)
  );

  console.log(scores);
  return (
    <Container>
      <Text>Big Dataaaar</Text>
      <View
        style={{ flexDirection: "row", alignItems: "flex-end", width: "100%", height: 100 }}
      >
        {scores.map(s => (
          <BouncyBar
            height={VOTE_MAP[s].score}
            style={{
              flex: 1,
              backgroundColor: VOTE_MAP[s].color,
              width: `${100 / scores.length}%`
            }}
          />
        ))}
      </View>
    </Container>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Roti" component={NewRotiScreen} />
        <Stack.Screen name="Statistics" component={Statistics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  stats: { backgroundColor: "green", width: 50, alignSelf: "flex-end" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
