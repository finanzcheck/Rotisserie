import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

function Button({ title, onPress, type }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "success" && styles.successButton,
        type === "neutral" && styles.neutralButton
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cb4e4e",
    shadowColor: "#ab3c3c",
    marginTop: 15,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    width: 200,
    height: 75
  },
  successButton: {
    backgroundColor: "#2ecc71",
    shadowColor: "#24b662"
  },
  neutralButton: {
    backgroundColor: "#fcad26",
    shadowColor: "#f29e0d",
    marginTop: 25
  },
  text: { color: "#ffffff", fontWeight: "bold", fontSize: 20 }
});

export default Button;
