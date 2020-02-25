import React, { useEffect, useCallback, useState } from "react";
import { AsyncStorage, Text, View, StyleSheet, Image } from "react-native";
import Button from "./Button";
import { percentageToColor } from "./utils";

const CURRENT = "current";

const getCurrentRotiFromStorage = async () => {
  try {
    const currentRoti = await AsyncStorage.getItem(CURRENT);
    if (currentRoti !== null) {
      return JSON.parse(currentRoti);
    }
  } catch (error) {
    console.log("error saving current roti: ", error);
    // Error retrieving data
  }
};

export const ResultScreen = ({ navigation }) => {
  const [currentRoti, setCurrentRoti] = useState(null);
  useEffect(() => {
    // init new roti entry
    const getCurrentRoti = async () => {
      const currentRoti = await getCurrentRotiFromStorage();
      setCurrentRoti(currentRoti);
    };
    getCurrentRoti();
  }, []);

  const clearAndNavigateHome = useCallback(async () => {
    await AsyncStorage.removeItem(CURRENT);
    navigation.navigate("Home");
  }, [navigation]);

  if (!currentRoti) return null;

  const average =
    currentRoti.votes.reduce((acc, vote) => acc + vote, 0) /
    currentRoti.votes.length;

  let imageSource =
    "https://www.baseballprospectus.com/wp-content/uploads/2018/04/this-is-fine.jpg";
  const sizeRatio = { width: 310, height: 150, marginTop: 50 };

  if (average >= 2 && average <= 3) {
    imageSource =
      "https://www.meme-arsenal.com/memes/579fffcfd3780f6d8224226433f35d74.jpg";
    sizeRatio.height = 200;
  } else if (average > 3) {
    imageSource =
      "https://images.maennersache.de/success-kid,id=22d8f890,b=maennersache,w=1100,rm=sk.jpeg";
  }

  return (
    <View style={styles.top}>
      <Text style={styles.titleText}>Result</Text>
      <View style={styles.centered}>
        <Text style={styles.titleText}>
          Your average is{" "}
          <Text style={{ color: percentageToColor(average / 5) }}>
            {Math.round(average)}
          </Text>
        </Text>
        <Image style={sizeRatio} source={{ uri: imageSource }} />
      </View>
      <View style={styles.centered}>
        <Button title="Home" type="success" onPress={clearAndNavigateHome} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 36,
    fontWeight: "bold"
  },
  top: { flex: 1, alignItems: "center", marginTop: 50 },
  centered: { flex: 1, justifyContent: "center" }
});
