import { Text, TextInput, View } from "react-native";
import { styles } from "./style";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import TransactionForm from "../../Components/TransactionForm";
import { storeSourceOfFund, updateSourceOfFund } from "../../utils/http";
import { TransactionsContext } from "../../store/transactionsContext";
import { useContext } from "react";
import SourceOfFundForm from "../../Components/SourceOfFundForm";
import { SourceOfFundContext } from "../../store/sourceOfFundContext";

const ManageSourceOfFunds = ({ route, navigation }) => {
  const sourceOfFundCtx = useContext(SourceOfFundContext);


  const confirmHandler = async (sourceOfFundData) => {
    const id = await storeSourceOfFund(sourceOfFundData);
    sourceOfFundCtx.addSourceOfFund({ ...sourceOfFundData, id: id });


    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SourceOfFundForm onSubmit={confirmHandler} />
    </View>
  );
};

export default ManageSourceOfFunds;
