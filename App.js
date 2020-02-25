import React from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={_storeData} title="Save" />
      <Button onPress={_retrieveData} title="Get" />
      <Button title="Go to Roti" onPress={() => navigation.navigate("Roti")} />
      <Button
        title="Go to Stats"
        onPress={() => navigation.navigate("Statistics")}
      />
    </View>
  );
}

function NewRotiScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Roti whoop whoop</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

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
        style={{ flexDirection: "row", alignItems: "flex-end", width: "100%" }}
      >
        {scores.map(s => (
          <View
            style={{
              flex: 1,
              backgroundColor: VOTE_MAP[s].color,
              height: VOTE_MAP[s].score,
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
