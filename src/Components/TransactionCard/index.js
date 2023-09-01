import { Pressable, Text, View } from "react-native";
import { styles } from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";

const TransactionCard = ({
  date,
  title,
  amount,
  sof,
  type,
  detail,
  onPress,
  id,
  transactionType,
  iconColor,
}) => {
  return (
    <Pressable
      onPress={() => {
        onPress.navigate("DetailTransaction", {
          transactionId: id,
          transactionTitle: title,
          transactionAmount: amount,
          transactionSof: sof,
          transactionType: type,
          transactionDetail: detail,
        });
      }}
      style={styles.container}
    >
      <Ionicons
        style={styles.icon}
        name={transactionType}
        size={24}
        color={iconColor}
      />
      <Text>{date} </Text>
      <Text>{title} </Text>
      <Text>{amount} </Text>
      <Text>{sof}</Text>
    </Pressable>
  );
};

export default TransactionCard;
