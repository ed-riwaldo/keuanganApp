import { Text, TextInput, View } from "react-native";
import { styles } from "./style";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import TransactionForm from "../../Components/TransactionForm";
import {
  fetchSourceOfFund,
  storeTransaction,
  updateSourceOfFund,
  updateTransaction,
} from "../../utils/http";
import { TransactionsContext } from "../../store/transactionsContext";
import { useContext, useEffect } from "react";
import { SourceOfFundContext } from "../../store/sourceOfFundContext";

const ManageTransactions = ({ route, navigation }) => {
  //context
  const transactionCtx = useContext(TransactionsContext);
  const sourceOfFundCtx = useContext(SourceOfFundContext);

  //di sini kita mengambil ide transaction untuk menandakan transaksi yang sedang diedit
  const editedTransactionId = route.params?.transactionId;
  // di sini bolean kalau editedTransactionya ada, maka user dipastikan melakukan edit transaksi
  const isEditing = !!editedTransactionId;

  //di sini kita mencari transaction yang punya id === editedTransactionId dari context
  const SelectedTransaction = transactionCtx.transactions.find(
    (transaction) => transaction.id === editedTransactionId
  );

  //di sini jalanin use effect untuk kondisi user mau edit maka headernya akan jadi edit transaction kalau mau buat transaksi baru maka headernya akan jadi Add transaction
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Transaction" : "Add Transaction",
    });
  }, [navigation, isEditing]);

  //ini untuk mencari data source of fund yang diambil dari database
  const sofCtx = useContext(SourceOfFundContext);
  useEffect(() => {
    async function getSourceOfFund() {
      try {
        const sourceOfFunds = await fetchSourceOfFund();
        // transactionCtx.getTransactions(sourceOfFunds);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
    }
    getSourceOfFund();
  }, []);

  const confirmHandler = async (transactionData) => {
    if (isEditing) {
      //di sini kondisi kalau isEditing true maka transaction context diupdate, dan update transaction di firebase
      transactionCtx.updateTransactions(editedTransactionId, transactionData);
      await updateTransaction(editedTransactionId, transactionData);
    } else {
      // kalau kondisi isEditing false maka yang dilakukan adalah store data ke context dan update data di firebase
      const id = await storeTransaction(transactionData);
      transactionCtx.addTransactions({ ...transactionData, id: id });
    }

    //ini function unuk mencari ID source of fund dari nama source of fund yang terpilih
    function findIdByAccountName(accountName) {
      const matchingSourceOfFund = sofCtx.sourceOfFund.find(
        (source) => source.accountName === accountName
      );
      return matchingSourceOfFund ? matchingSourceOfFund.id : null;
    }

    const choosenSofId = findIdByAccountName(transactionData.sof);
    const balanceFromAmount = transactionData.amount;

    const currentSourceOfFund = sofCtx.sourceOfFund.find(
      (source) => source.id === choosenSofId
    );

    const updateBalanceHandler = () => {
      //di sini perlu kasih kondisi if editing, maka initial balancenya akan sama.

      //kalau expense

      console.log(
        "source of fund balance & amount in field",
        // currentSourceOfFund.balance,
        balanceFromAmount,
        SelectedTransaction.amount
      );

      // if (SelectedTransaction.amount === balanceFromAmount) {
      //   return currentSourceOfFund.balance;
      // } else if (SelectedTransaction.amount !== balanceFromAmount) {
      //   if (isEditing) {
      //     if (transactionData.type === "Income") {
      //       const adding = (SelectedTransaction.amount = balanceFromAmount);
      //       console.log(adding);
      //       return adding;
      //     } else if (transactionData.type === "Expense") {
      //       const subtract = (SelectedTransaction.amount = balanceFromAmount);
      //       console.log(subtract);
      //       return subtract;
      //     }
      //   } else {
      //     if (transactionData.type === "Income") {
      //       const adding = currentSourceOfFund.balance + balanceFromAmount;
      //       console.log(adding);
      //       return adding;
      //     } else if (transactionData.type === "Expense") {
      //       const subtract = currentSourceOfFund.balance - balanceFromAmount;
      //       console.log(subtract);
      //       return subtract;
      //     }
      //   }
      // }

      // if (isEditing) {
      //   if (SelectedTransaction.amount === balanceFromAmount) {
      //     return currentSourceOfFund.balance;
      //   } else if (SelectedTransaction.amount !== balanceFromAmount) {
      //     if (transactionData.type === "Income") {
      //       const adding = currentSourceOfFund.balance + balanceFromAmount;
      //       return adding
      //     } else if (transactionData.type === "Expense") {
      //       const subtract = currentSourceOfFund.balance - balanceFromAmount;
      //       return subtract
      //   }
      // }

      if (transactionData.type === "Income") {
        const adding = currentSourceOfFund.balance + balanceFromAmount;
        console.log(adding);
        return adding;
      } else if (transactionData.type === "Expense") {
        const subtract = currentSourceOfFund.balance - balanceFromAmount;
        console.log(subtract);
        return subtract;
      }
    };

    const updatedBalance = updateBalanceHandler();

    const updatedSourceOfFund = {
      ...currentSourceOfFund,
      balance: updatedBalance,
    };

    sourceOfFundCtx.updateSourceOfFund(choosenSofId, updatedSourceOfFund);
    await updateSourceOfFund(choosenSofId, updatedSourceOfFund);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TransactionForm
        onSubmit={confirmHandler}
        defaultValues={SelectedTransaction}
      />
    </View>
  );
};

export default ManageTransactions;
