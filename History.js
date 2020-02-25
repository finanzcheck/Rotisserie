import React, { useEffect, useState } from "react";
import { Animated, AsyncStorage, Easing, View, Text } from "react-native";
import { percentageToColor } from "./utils";

const getRotis = async () => {
  try {
    return await AsyncStorage.getItem("roti");
  } catch (error) {
    console.log("error getting current roti: ", error);
  }
};

const BouncyBar = props => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: props.height,
      easing: Easing.bounce,
      duration: 1000
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...props.style,
        height: fadeAnim
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const HistoryBar = ({ rotis }) => {
  const scores = rotis.map(r =>
    Math.round(r.votes.reduce((sum, vote) => sum + vote) / r.votes.length)
  );

  const BASE_HEIGHT = 100;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        width: "100%",
        height: BASE_HEIGHT
      }}
    >
      {scores.map(s => (
        <BouncyBar
          height={(s / 5) * BASE_HEIGHT}
          style={{
            flex: 1,
            backgroundColor: percentageToColor(s / 5),
            width: `${100 / scores.length}%`
          }}
        />
      ))}
    </View>
  );
};

const HistoryContainer = () => {
  const [rotis, setRotis] = useState(null);
  useEffect(() => {
    getRotis().then(r => setRotis(r));
  });

  return rotis ? (
    <HistoryBar rotis={rotis} />
  ) : (
    <>
      <Text style={{ marginBottom: 10 }}>I need more ROTIs to show a 📊…</Text>
      <Text>Go, have a meeting❗️</Text>
    </>
  );
};

export default HistoryContainer;
