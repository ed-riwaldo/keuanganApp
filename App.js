import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Homepage from "./src/Screens/Homepage";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/Components/BottomNav";
import { createStackNavigator } from "@react-navigation/stack";
import Report from "./src/Screens/Report";
import ManageTransactions from "./src/Screens/ManageTransactions";
import TransactionContexProvider from "./src/store/transactionsContext";
import DetailTransaction from "./src/Screens/DetailTransaction";
import ManageSourceOfFunds from "./src/Screens/ManageSourceOfFunds";
import SourceOfFundContexProvider from "./src/store/sourceOfFundContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <TransactionContexProvider>
      <SourceOfFundContexProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen
              name="ManageTransactions"
              component={ManageTransactions}
              options={{
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="DetailTransaction"
              component={DetailTransaction}
            />
            <Stack.Screen
              name="ManageSourceOfFund"
              component={ManageSourceOfFunds}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SourceOfFundContexProvider>
    </TransactionContexProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
