import {Text, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";

function Button({title, onPress}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#cb4e4e",
        shadowColor: "#ab3c3c",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        width: 200,
        height: 75,
        marginBottom: 10
    },
    text: {color: "#ffffff", fontWeight: 'bold', fontSize: 20}
});


export default Button;
