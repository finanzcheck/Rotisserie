import React, { useEffect } from "react";
import { AsyncStorage, Text, View, StyleSheet } from "react-native";
import Button from "./Button";

function guidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

const CURRENT = "CURRENT_ROTI";

const setInitialRoti = async () => {
  try {
    const uniqueRotiID = guidGenerator();
    const initialRotiValues = {
      id: uniqueRotiID,
      date: Date.now(),
      votes: []
    };
    await AsyncStorage.setItem(CURRENT, JSON.stringify(initialRotiValues));
  } catch (error) {
    console.log("Error saving Roti: ", error);
  }
};

const addVoteToRoti = async value => {
  try {
    const currentRoti = await AsyncStorage.getItem(CURRENT);
    if (currentRoti !== null) {
      const parsedCurrentRoti = JSON.parse(currentRoti);
      // We have data!!
      const newCurrentRoti = {
        ...parsedCurrentRoti,
        votes: parsedCurrentRoti.votes.concat([value])
      };
      await AsyncStorage.setItem(CURRENT, JSON.stringify(newCurrentRoti));
    }
  } catch (error) {
    console.log("error adding roti: ", error);
    // Error retrieving data
  }
};

const getCurrentRoti = async () => {
  try {
    const currentRoti = await AsyncStorage.getItem(CURRENT);
    if (currentRoti !== null) {
      console.log("currentRoti: ", currentRoti);
    }
  } catch (error) {
    console.log("error getting current roti: ", error);
    // Error retrieving data
  }
};

function NewRotiScreen({ navigation }) {
  useEffect(() => {
    // init new roti entry
    setInitialRoti();
  }, []);

  return (
    <View style={styles.top}>
      <Text style={styles.titleText}>Let the ROTI hit the floor</Text>
      <View style={styles.centered}>
        <Button title="1" onPress={() => addVoteToRoti(1)} />
        <Button title="2" onPress={() => addVoteToRoti(2)} />
        <Button title="3" onPress={() => addVoteToRoti(3)} />
        <Button title="4" onPress={() => addVoteToRoti(4)} />
        <Button title="5" onPress={() => addVoteToRoti(5)} />
        <Button title="Continue" type="success" onPress={getCurrentRoti} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin",
    marginVertical: 20
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold"
  },
  top: { flex: 1, alignItems: "center", marginTop: 50 },
  centered: { flex: 1, justifyContent: "center" }
});

export default NewRotiScreen;
