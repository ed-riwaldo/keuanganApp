import TransactionCard from "../TransactionCard";
import { FlatList, View } from "react-native";
import { styles } from "./style";

const TransactionCardList = ({ transactions, onPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.id}
        data={transactions}
        renderItem={({ item }) => {
          const getTransactionTypeAndColor = (type) => {
            const lowerType = type.toLowerCase();
            if (lowerType === "expense") {
              return { transactionType: "flame", iconColor: "red" };
            } else if (lowerType === "income") {
              return { transactionType: "leaf", iconColor: "green" };
            }
            return { transactionType: "", iconColor: "" };
          };

          const { transactionType, iconColor } = getTransactionTypeAndColor(
            item.type
          );
          return (
            <TransactionCard
              id={item.id}
              transactionType={transactionType}
              iconColor={iconColor}
              date={item.date}
              title={item.title}
              sof={item.sof}
              detail={item.detail}
              type={item.type}
              amount={item.amount}
              onPress={onPress}
            />
          );
        }}
      />
    </View>
  );
};

export default TransactionCardList;
