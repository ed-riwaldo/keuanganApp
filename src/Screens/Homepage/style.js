import { StyleSheet } from "react-native";

import { Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginh: 24,
    width: width,
    flex: 1,
    // backgroundColor: "green",
  },
});
