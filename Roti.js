import React, { useEffect, useCallback } from "react";
import { AsyncStorage, Text, View, StyleSheet } from "react-native";

import Button from "./Button";
import {useRotis} from "./useRotis";

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

export const NewRotiScreen = ({ navigation }) => {
  const [{ current, rotis }, setCurrent, setRotis] = useRotis();

  useEffect(() => {
    // init new roti entry
    const uniqueRotiID = guidGenerator();
    const initialRotiValues = {
      id: uniqueRotiID,
      date: Date.now(),
      votes: []
    };
    setCurrent(initialRotiValues);
  }, []);

  const setRotiAndNavigate = useCallback(async () => {
    setRotis([...rotis, current]);
    setCurrent(null);

    navigation.navigate("Result");
  }, [navigation, current, rotis]);

  return (
    <View style={styles.top}>
      <Text style={styles.titleText}>Pick a value</Text>
      <View style={styles.centered}>
        {[1, 2, 3, 4, 5].map(score => (
          <Button
            key={score}
            title={score}
            onPress={() => {
              const { votes, ...rest } = current;
              setCurrent({ ...rest, votes: [...votes, score] });
            }}
          />
        ))}

        <Button
          key="Done"
          title="Done"
          type="success"
          onPress={setRotiAndNavigate}
        />
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
