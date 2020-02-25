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

  const deleteRotis = () => {
    AsyncStorage.removeItem("rotis");
  };

  if (!rotis) {
    return (
      <View>
        <Text style={styles.titleText}>Rotisserie!</Text>
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
      <Text style={styles.titleText}>
        Rotisserie!
      </Text>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <HistoryBar />
      {rotiComponents}
      <Button
        type="neutral"
        title="New Roti"
        onPress={() => navigation.navigate("Roti")}
      />
      <Button title="Delete Rotis" onPress={deleteRotis} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 50
  },
  container: {
    flex: 1,
    alignItems: "center"
  }
});
