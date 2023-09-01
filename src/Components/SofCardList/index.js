import { FlatList, Text, View } from "react-native";
import { styles } from "./style";
import SofCard from "../SofCard";

const SourceOfFundCardList = ({ sourceOfFunds, onPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.id}
        data={sourceOfFunds}
        renderItem={({ item }) => (
          <>
            <SofCard
              accountName={item.accountName}
              balance={item.balance}
              addedDate={item.date}
              onPress={(onPress, console.log(sourceOfFunds))} // Pass onPress function to SofCard if needed
            />
          </>
        )}
      />
    </View>
  );
};

export default SourceOfFundCardList;
