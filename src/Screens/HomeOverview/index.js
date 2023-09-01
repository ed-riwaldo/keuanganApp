import React, { memo, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import ExpenseIncomeOverview from "../../Components/ExpenseIncomeOverview";
import { styles } from "./style";
import TransactionCard from "../../Components/TransactionCard";
import TransactionCardList from "../../Components/TransactionCardList";
import FloatingButton from "../../Components/FAB";
import { fetchTransaction } from "../../utils/http";
import { TransactionsContext } from "../../store/transactionsContext";

const HomeOverview = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const transactionCtx = useContext(TransactionsContext);

  useEffect(() => {
    async function getTransactions() {
      setIsFetching(true);
      try {
        const transactions = await fetchTransaction();
        transactionCtx.getTransactions(transactions);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }

    getTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <FloatingButton
        title={"Add transaction"}
        onPress={() => navigation.navigate("ManageTransactions")}
      />
      <ExpenseIncomeOverview transactions={transactionCtx.transactions} />
      <TransactionCardList
        transactions={transactionCtx.transactions}
        onPress={navigation}
      />
    </View>
  );
};

export default HomeOverview;
