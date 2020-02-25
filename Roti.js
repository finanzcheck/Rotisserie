import React, { useEffect, useCallback } from "react";
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

const CURRENT = "current";
const ROTIS = "rotis";

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

const saveCurrentRoti = async navigation => {
  try {
    const currentRoti = await AsyncStorage.getItem(CURRENT);
    const rotis = await AsyncStorage.getItem(ROTIS);
    if (currentRoti !== null) {
      const parsedCurrentRoti = JSON.parse(currentRoti);
      const parsedRotis = JSON.parse(rotis);
      await AsyncStorage.setItem(
        ROTIS,
        JSON.stringify(
          parsedRotis
            ? parsedRotis.concat(parsedCurrentRoti)
            : [parsedCurrentRoti]
        )
      );
      navigation.navigate("Result");
    }
  } catch (error) {
    console.log("error saving current roti: ", error);
    // Error retrieving data
  }
};

export const NewRotiScreen = ({ navigation }) => {
  useEffect(() => {
    // init new roti entry
    setInitialRoti();
  }, []);

  const setRotiAndNavigate = useCallback(async () => {
    await saveCurrentRoti(navigation);
  }, [navigation]);

  return (
    <View style={styles.top}>
      <Text style={styles.titleText}>Pick a value</Text>
      <View style={styles.centered}>
        <Button key="1" title="1" onPress={() => addVoteToRoti(1)} />
        <Button key="2" title="2" onPress={() => addVoteToRoti(2)} />
        <Button key="3" title="3" onPress={() => addVoteToRoti(3)} />
        <Button key="4" title="4" onPress={() => addVoteToRoti(4)} />
        <Button key="5" title="5" onPress={() => addVoteToRoti(5)} />
        <Button key="Done" title="Done" type="success" onPress={setRotiAndNavigate} />
      </View>
    </View>
  );
};

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
