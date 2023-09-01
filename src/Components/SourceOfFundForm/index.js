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
    balance: {
      value: defaultValues ? defaultValues.balance.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
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
      balance: +inputs.balance.value,
      date: inputs.date.value,
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
      <Text>Balance</Text>
      <TextInput
        style={styles.input}
        inputMode="numeric"
        onChangeText={inputChangedHandler.bind(this, "balance")}
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
