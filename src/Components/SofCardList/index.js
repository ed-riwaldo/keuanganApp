import { FlatList, Text, View } from "react-native";
import { styles } from "./style";
import SofCard from "../SofCard";
import { TransactionsContext } from "../../store/transactionsContext";
import { useContext } from "react";

const SourceOfFundCardList = ({ sourceOfFunds, onPress }) => {
  const transactionCtx = useContext(TransactionsContext);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.id.toString()}
        data={sourceOfFunds}
        renderItem={({ item }) => {
          // Calculate the total balance here
          const totalBalance = transactionCtx.transactions.reduce(
            (sum, trx) => {
              if (trx.sof === item.accountName) {
                return sum + trx.amount;
              }
              return sum;
            },
            0
          );

          // Return the SofCard component with the calculated totalBalance
          return (
            <>
              <SofCard
                accountName={item.accountName}
                initialBalance={item.initialBalance}
                addedDate={item.date}
                currentBalance={totalBalance}
                onPress={() => {
                  // You can add your onPress logic here
                  console.log(sourceOfFunds);
                }}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default SourceOfFundCardList;
