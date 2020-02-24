import React, { useEffect, useState } from "react";
import { AsyncStorage, Button, StyleSheet, Text, View } from "react-native";

const key = "Rotis";

const defaultRotis = [
  { id: 1, date: new Date(), votes: [3, 4, 4, 4] },
  { id: 2, date: new Date(), votes: [3, 4, 4, 4, 5] },
  { id: 3, date: new Date(), votes: [3, 4, 4, 4] },
  { id: 4, date: new Date(), votes: [2, 3, 4, 4, 4] }
];

export const HomeScreen = ({ navigation }) => {
  const [rotis, setRotis] = useState(defaultRotis);

  useEffect(() => {
    AsyncStorage.getItem(key).then(rotis => {
      setRotis(JSON.parse(rotis));
    });
  }, []);

  if (!rotis) {
    return (
      <View>
        <Text>Rotisserie!</Text>
        <Text>Loading...</Text>
      </View>
    );
  }

  const rotiComponents = rotis.map(roti => (
    <Text
      key={`roti_${roti.id}`}
    >{`${roti.id}: On ${roti.date} ${roti.votes.length} people voted ${roti.votes}`}</Text>
  ));

  return (
    <View style={styles.container}>
      <Text>Rotisserie!</Text>
      {rotiComponents}
      <Button title="Go to Roti" onPress={() => navigation.navigate("Roti")} />
      <Button
        title="Go to Statistics"
        onPress={() => navigation.navigate("Statistics")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
