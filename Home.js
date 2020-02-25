import React, { useEffect, useState } from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";

import HistoryBar from "./History";
import Button from "./Button";

const key = "Rotis";

/*
const defaultRotis = [
  { id: 1, date: new Date(), votes: [3, 4, 4, 4] },
  { id: 2, date: new Date(), votes: [3, 4, 4, 4, 5] },
  { id: 3, date: new Date(), votes: [3, 4, 4, 4] },
  { id: 4, date: new Date(), votes: [2, 3, 4, 4, 4] }
];
*/

export const HomeScreen = ({ navigation }) => {
  const [rotis, setRotis] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(key).then(rotis => {
      setRotis(JSON.parse(rotis) || []);
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
        <HistoryBar/>
      {rotiComponents}
      <Button type="neutral" title="Go to Roti" onPress={() => navigation.navigate("Roti")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
