import React, { memo } from "react";
import { Text, View } from "react-native";
import ExpenseIncomeOverview from "../../Components/ExpenseIncomeOverview";
import { styles } from "./style";
import TransactionCard from "../../Components/TransactionCard";
import TransactionCardList from "../../Components/TransactionCardList";
import FloatingButton from "../../Components/FAB";

import { NavigationContainer } from "@react-navigation/native";
import Tabs from "../../Components/BottomNav";

const Homepage = ({ navigation }) => {
  return <Tabs />;
};

export default Homepage;
