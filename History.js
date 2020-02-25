import React, { useEffect, useState } from "react";
import { Animated, AsyncStorage, Easing, View, Text } from "react-native";

import { percentageToColor } from "./utils";
import {useRotis} from "./useRotis";

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
    r.votes.reduce((sum, vote) => sum + vote, 0) / r.votes.length
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
  const [{ rotis }] = useRotis();

  return !!rotis.length ? (
    <HistoryBar rotis={rotis} />
  ) : (
    <>
      <Text style={{ marginBottom: 10, fontSize: 20 }}>I need more ROTIs to show a 📊…</Text>
      <Text style={{ fontSize: 20 }}>Go, have a meeting❗️</Text>
    </>
  );
};

export default HistoryContainer;
