import { Text, View } from "react-native";
import { styles } from "./style";
import FloatingButton from "../../Components/FAB";
import SofCard from "../../Components/SofCard";
import SourceOfFundCardList from "../../Components/SofCardList";
import { useContext, useEffect, useState } from "react";
import { SourceOfFundContext } from "../../store/sourceOfFundContext";
import { fetchSourceOfFund } from "../../utils/http";
import { TransactionsContext } from "../../store/transactionsContext";

const SourceOfFund = ({ navigation, route }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const sofCtx = useContext(SourceOfFundContext);
  const transactionCtx = useContext(TransactionsContext);

  useEffect(() => {
    async function getSourceOfFund() {
      try {
        const sourceOfFunds = await fetchSourceOfFund();
        sofCtx.getSourceOfFund(sourceOfFunds);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
    }
    console.log(sofCtx.sourceOfFund);

    getSourceOfFund();
  }, []);

  return (
    <View style={styles.container}>
      <SourceOfFundCardList sourceOfFunds={sofCtx.sourceOfFund} />
      <FloatingButton
        title={"Add Accounts"}
        onPress={() => navigation.navigate("ManageSourceOfFund")}
      />
    </View>
  );
};

export default SourceOfFund;
