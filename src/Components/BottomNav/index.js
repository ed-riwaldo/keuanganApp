import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// import Homepage from "../../Screens/Homepage";
import HomeOverview from "../../Screens/HomeOverview";
import Report from "../../Screens/Report";
import ManageTransactions from "../../Screens/ManageTransactions";
import SourceOfFund from "../../Screens/SourceOfFund";
import Profile from "../../Screens/Profile";

import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeOverview"
        component={HomeOverview}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="report"
        component={Report}
        options={{
          tabBarLabel: "Report",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="manageExpense"
        component={ManageExpensesScreen}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" color={color} size={32} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="SourceOfFund"
        component={SourceOfFund}
        options={{
          tabBarLabel: "SOF",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
