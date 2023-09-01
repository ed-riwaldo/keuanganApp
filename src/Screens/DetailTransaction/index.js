import { Text, View } from "react-native";
import { styles } from "./style";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import {
  deleteTransaction,
  fetchSourceOfFund,
  updateSourceOfFund,
} from "../../utils/http";
import { useContext, useEffect } from "react";
import { TransactionsContext } from "../../store/transactionsContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SourceOfFundContext } from "../../store/sourceOfFundContext";

const DetailTransaction = ({ route, navigation }) => {
  const id = route.params?.transactionId;
  const title = route.params?.transactionTitle;
  const amount = route.params?.transactionAmount;
  const detail = route.params?.transactionDetail;
  const type = route.params?.transactionType;
  const sof = route.params?.transactionSof;

  const sourceOfFundCtx = useContext(SourceOfFundContext);
  const transactionCtx = useContext(TransactionsContext);
  const sofCtx = useContext(SourceOfFundContext);

  //ini use effect buat tarik data dari database, dan simpan datanya ke local context sourceOfFund
  useEffect(() => {
    async function getSourceOfFund() {
      try {
        //di sini fetchSourceOfFund itu bakal munculin semua data yang ada di firebase, dan datanya disimpan dalam sebuah variable sourceOfFunds
        const sourceOfFunds = await fetchSourceOfFund();
        //kemudian di local context ngejalanin getSourceOfFund yang datanya diambil dari variable sourceOfFunds
        sourceOfFundCtx.getSourceOfFund(sourceOfFunds);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
    }
    // di use effect ini langsung ngejalanin function getSourceOfFund, jadi data di local context itu bisa langsung dibaca.
    getSourceOfFund();
  }, []);

  //ini handler untuk delete button
  const deleteTransactionHandler = async () => {
    //Delete data from firebase and context
    await deleteTransaction(id);
    transactionCtx.deleteTransactions(id);

    //Function untuk cari ID Sof dari nama/accountName
    function findIdByAccountName(accountName) {
      const matchingSourceOfFund = sofCtx.sourceOfFund.find(
        (source) => source.accountName === accountName
      );
      return matchingSourceOfFund ? matchingSourceOfFund.id : null;
    }

    //simpan ID yang ditemukan dari function FindIdByAccountName di dalam variable choosenSofId
    const choosenSofId = findIdByAccountName(sof);

    const currentSourceOfFund = sofCtx.sourceOfFund.find(
      (source) => source.id === choosenSofId
    );

    // function untuk me-return balance, jadi saat dihapus income maka balance akan berkurang, kalau yang dihapus itu expense maka income akan bertambah
    const updateBalanceHandler = () => {
      if (type === "Income") {
        const adding = currentSourceOfFund.balance - amount;
        //ini yang direturn saat income
        return adding;
      } else if (type === "Expense") {
        const subtract = currentSourceOfFund.balance + amount;
        //ini yang direturn saat expense
        return subtract;
      }
    };

    //simpan hasil return dari function updateBalanceHandler dalam variable updateBalance
    const updatedBalance = updateBalanceHandler();

    //simpan data yang baru dalam variable updatedSoureOfFund
    const updatedSourceOfFund = {
      ...currentSourceOfFund,
      balance: updatedBalance,
    };

    //data dari updatedSourceOfFund itu bakal diupdate di Context nya sourceofFundCtx dan juga diupdate di firebase
    sourceOfFundCtx.updateSourceOfFund(choosenSofId, updatedSourceOfFund);
    await updateSourceOfFund(choosenSofId, updatedSourceOfFund);

    navigation.goBack();
  };

  //ini handler untuk edit button
  const editTransactionHander = () => {
    navigation.navigate("ManageTransactions", { transactionId: id });
  };

  return (
    <View style={styles.container}>
      <Text> Detail transaction here component here</Text>
      <Text> {id}</Text>
      <Text> {title}</Text>
      <Text> {amount}</Text>
      <Text> {detail}</Text>
      <Text> {type}</Text>
      <Text> account name === {sof}</Text>
      <View style={styles.buttons}>
        <PrimaryButton
          onPress={editTransactionHander}
          title={"edit"}
          iconName={"create"}
        />
        <PrimaryButton
          onPress={deleteTransactionHandler}
          title={"delete "}
          iconName={"trash"}
        />
      </View>
    </View>
  );
};

export default DetailTransaction;
