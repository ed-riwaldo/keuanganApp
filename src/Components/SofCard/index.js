import { Text, View } from "react-native";
import { styles } from "./style";

const SofCard = ({
  accountName,
  initialBalance,
  addedDate,
  sourceOfFund,
  currentBalance,
}) => {
  return (
    <View>
      <View style={styles.card}>
        <Text>{accountName}</Text>
        <Text>initial balance = {initialBalance}</Text>
        <Text>Current balance = {currentBalance}</Text>
        <Text>{addedDate}</Text>
      </View>
    </View>
  );
};

export default SofCard;
