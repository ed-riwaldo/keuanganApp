import { View, Text } from "react-native";
import { styles } from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";

const ExpenseIncomeOverview = ({ transactions }) => {
  const expenseSum = transactions.reduce((sum, expense) => {
    if (expense.type.toLowerCase() === "expense") {
      return sum + expense.amount;
    }
    return sum;
  }, 0);

  const incomeSum = transactions.reduce((sum, income) => {
    if (income.type.toLowerCase() === "income") {
      return sum + income.amount;
    }
    return sum;
  }, 0);

  const iconSize = 18;

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.overview}>Overview this month</Text>
      <View style={styles.container}>
        {/* INCOME */}
        <View>
          <View style={styles.labelIconContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                style={styles.icon}
                name="arrow-down-outline"
                size={iconSize}
                color="green"
              />
            </View>
            <Text>Income</Text>
          </View>
          <Text style={styles.amount}>{incomeSum}</Text>
        </View>

        {/* EXPENSE */}
        <View>
          <View style={styles.labelIconContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                style={styles.icon}
                name="arrow-up-outline"
                size={iconSize}
                color="red"
              />
            </View>
            <Text>Expense</Text>
          </View>
          <Text style={styles.amount}>{expenseSum}</Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseIncomeOverview;
