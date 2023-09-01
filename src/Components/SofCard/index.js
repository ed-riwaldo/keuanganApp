import { Text, View } from "react-native";
import { styles } from "./style";

const SofCard = ({ accountName, balance, addedDate, sourceOfFund }) => {
  return (
    <View>
      <View style={styles.card}>
        <Text>{accountName}</Text>
        <Text>{balance}</Text>
        <Text>{addedDate}</Text>
      </View>
    </View>
  );
};

export default SofCard;
