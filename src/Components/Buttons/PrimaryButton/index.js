import { Pressable, Text, View } from "react-native";
import { styles } from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";

const PrimaryButton = ({ onPress, children, title, iconName }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons style={styles.icon} size={24} name={iconName} />
      <Text>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
