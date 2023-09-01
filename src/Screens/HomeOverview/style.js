import { StyleSheet } from "react-native";

import { Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: width,
    flex: 1,
    // backgroundColor: "green",
  },
});
