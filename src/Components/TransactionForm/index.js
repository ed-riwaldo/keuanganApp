import { Text, TextInput, View } from "react-native";
import { styles } from "./style";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useContext, useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { fetchSourceOfFund } from "../../utils/http";
import { SourceOfFundContext } from "../../store/sourceOfFundContext";

const TransactionForm = ({ defaultValues, onSubmit, addedAmount }) => {
  const [inputs, setInputs] = useState({
    type: {
      // value di sini bakal cek defaultValues terlebih dahulu, kalau default valuenya kosong maka hanya akan menampilkan value kosong "".
      value: defaultValues ? defaultValues.type.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toString() : "testing",
      isValid: true,
    },
    title: {
      value: defaultValues ? defaultValues.title.toString() : "testing",
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "100",
      isValid: true,
    },
    detail: {
      value: defaultValues ? defaultValues.detail.toString() : "testing",
      isValid: true,
    },
    sof: {
      value: defaultValues ? defaultValues.sof.toString() : "",
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
    const transactionData = {
      // type: inputs.type.value,
      type: selectedType,
      // date: new Date(inputs.date.value),
      date: inputs.date.value,
      title: inputs.title.value,
      amount: +inputs.amount.value,
      detail: inputs.detail.value,
      sof: value,
    };

    console.log(transactionData);
    onSubmit(transactionData);
  };

  addedAmount = +inputs.amount.value;

  //HANDLER RADIO BUTTON EXPENSE INCOME
  const [selectedType, setSelectedType] = useState(
    defaultValues ? defaultValues.type : "Expense"
  ); // Default value: 'Expense'
  const handleTypeChange = (value) => {
    setSelectedType(value);
    console.log("VALUE DARI DROPDOWN", value);
  };

  // HANDLER DROPDOWN PICKER SOF
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValues ? defaultValues.sof : "");
  const [items, setItems] = useState([]);
  // const [items, setItems] = useState([]);
  const sofCtx = useContext(SourceOfFundContext);

  useEffect(() => {
    async function getSourceOfFund() {
      try {
        const sourceOfFunds = await fetchSourceOfFund();
        sofCtx.getSourceOfFund(sourceOfFunds);
        const formattedItems = sourceOfFunds.map((item) => ({
          label: item.accountName,
          value: item.accountName,
        }));
        setItems(formattedItems);
        // setItems(defaultValues ? defaultValues.sof : formattedItems);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
    }

    getSourceOfFund();
  }, []);

  //RETURN COMPONENTS

  return (
    <View style={styles.container}>
      <RadioButton.Group onValueChange={handleTypeChange} value={selectedType}>
        <View style={styles.radioButtonContainer}>
          <RadioButton value="Expense" />
          <Text>Expense</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton value="Income" />
          <Text>Income</Text>
        </View>
      </RadioButton.Group>
      <Text>Tanggal</Text>
      <TextInput
        style={styles.input}
        onChangeText={inputChangedHandler.bind(this, "date")}
        value={inputs.date.value}
      />
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={inputChangedHandler.bind(this, "title")}
        value={inputs.title.value}
      />
      <Text>Amount</Text>
      <TextInput
        style={styles.input}
        inputMode="numeric"
        onChangeText={inputChangedHandler.bind(this, "amount")}
        value={inputs.amount.value}
      />
      <Text>Detail</Text>
      <TextInput
        style={styles.input}
        onChangeText={inputChangedHandler.bind(this, "detail")}
        value={inputs.detail.value}
      />
      <DropDownPicker
        placeholder={defaultValues ? defaultValues.sof : "Choose your SOF"}
        style={styles.input}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <PrimaryButton onPress={onSubmitHandler} title={"save transaction"} />
    </View>
  );
};

export default TransactionForm;
