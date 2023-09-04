import { Text, TextInput, View } from "react-native";
import { styles } from "./style";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useState } from "react";
import { RadioButton } from "react-native-paper";

const SourceOfFundForm = ({ defaultValues, onSubmit }) => {
  const [inputs, setInputs] = useState({
    accountName: {
      value: defaultValues ? defaultValues.accountName.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    initialBalance: {
      value: defaultValues ? defaultValues.initialBalance.toString() : "",
    },
    balance: {
      value: defaultValues ? defaultValues.balance.toString() : "",
      isValid: true,
    },
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const onSubmitHandler = () => {
    const sourceOfFundData = {
      accountName: inputs.accountName.value,
      initialBalance: +inputs.initialBalance.value,
      date: inputs.date.value,
      balance: 0,
    };

    onSubmit(sourceOfFundData);
  };

  return (
    <View style={styles.container}>
      <Text>Account Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={inputChangedHandler.bind(this, "accountName")}
      />
      <Text>Initial balance</Text>
      <TextInput
        style={styles.input}
        inputMode="numeric"
        onChangeText={inputChangedHandler.bind(this, "initialBalance")}
      />
      <Text>Date</Text>
      <TextInput
        style={styles.input}
        onChangeText={inputChangedHandler.bind(this, "date")}
      />
      <PrimaryButton onPress={onSubmitHandler} title={"save new sof"} />
    </View>
  );
};

export default SourceOfFundForm;
