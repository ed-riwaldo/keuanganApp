import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export const styles = StyleSheet.create({
  rootContainer: {
    borderBlockColor: "black",
    borderWidth: 2,
    // backgroundColor: "purple",
    padding: 16,
    borderRadius: 20,
  },
  container: {
    flexDirection: "row",
    // backgroundColor: "yellow",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overview: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  labelIconContainer: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#80808063",
    height: 24,
    width: 24,
    marginRight: 8,
  },

  icon: {
    alignSelf: "center",
  },

  amount: {
    fontSize: 20,
  },
});
