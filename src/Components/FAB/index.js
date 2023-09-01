import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./style";

const FloatingButton = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text>{title}</Text>
    </Pressable>
  );
};

export default FloatingButton;
