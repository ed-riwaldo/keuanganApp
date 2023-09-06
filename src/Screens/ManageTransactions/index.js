import { Text, TextInput, View } from "react-native";
import { styles } from "./style";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import TransactionForm from "../../Components/TransactionForm";
import {
  fetchSourceOfFund,
  storeTransaction,
  updateTransaction,
} from "../../utils/http";
import { TransactionsContext } from "../../store/transactionsContext";
import { useContext, useEffect } from "react";
import { SourceOfFundContext } from "../../store/sourceOfFundContext";

const ManageTransactions = ({ route, navigation }) => {
  //context
  const transactionCtx = useContext(TransactionsContext);
  const sofCtx = useContext(SourceOfFundContext);
  //di sini kita mengambil ide transaction untuk menandakan transaksi yang sedang diedit
  const editedTransactionId = route.params?.transactionId;
  // di sini bolean kalau editedTransactionya ada, maka user dipastikan melakukan edit transaksi
  const isEditing = !!editedTransactionId;
  //di sini kita mencari transaction yang punya id === editedTransactionId dari context
  const SelectedTransaction = transactionCtx.transactions.find(
    (transaction) => transaction.id === editedTransactionId
  );

  //use effect untuk mengubah title
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Transaction" : "Add Transaction",
    });
  }, [navigation, isEditing]);

  //use effect untuk fetching data
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
