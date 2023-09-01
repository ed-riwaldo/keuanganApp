import axios from "axios";

const BACKEND_URL = "https://keuanganapp-e7e23-default-rtdb.firebaseio.com";

//SENDING TRANSACTION DATA TO FIREBASE
export async function storeTransaction(transactionData) {
  const response = await axios.post(
    BACKEND_URL + "/transactions.json",
    transactionData
  );
  const id = response.data.name;
  return id;
}
//SENDING SOURCE OF FUND DATA TO FIREBASE
export async function storeSourceOfFund(SourceOfFundData) {
  const response = await axios.post(
    BACKEND_URL + "/SourceOfFundData.json",
    SourceOfFundData
  );
  const id = response.data.name;
  return id;
}

//UPDATE TRANSACTIONS
export async function updateTransaction(id, transactionData) {
  return axios.put(BACKEND_URL + `/transactions/${id}.json`, transactionData);
}

//UPDATE SOURCE OF FUND
export function updateSourceOfFund(id, sourceOfFundsData) {
  return axios.put(
    BACKEND_URL + `/SourceOfFundData/${id}.json`,
    sourceOfFundsData
  );
}

//FETCHING TRANSACTION DATA FROM FIREBASE
export const fetchTransaction = async () => {
  const response = await axios.get(BACKEND_URL + "/transactions.json");

  const transactionsData = [];

  for (const key in response.data) {
    const transactionObj = {
      id: key,
      type: response.data[key].type,
      date: response.data[key].date,
      title: response.data[key].title,
      amount: response.data[key].amount,
      detail: response.data[key].detail,
      sof: response.data[key].sof,
    };
    transactionsData.push(transactionObj);
  }

  return transactionsData;
};

//FETCHING SOURCE OF FUND DATA FROM FIREBASE
export const fetchSourceOfFund = async () => {
  const response = await axios.get(BACKEND_URL + "/SourceOfFundData.json");

  const sourceOfFundsData = [];

  for (const key in response.data) {
    const sourceOfFundObj = {
      id: key,
      accountName: response.data[key].accountName,
      balance: response.data[key].balance,
      date: response.data[key].date,
    };
    sourceOfFundsData.push(sourceOfFundObj);
  }

  return sourceOfFundsData;
};

//DELETE DATA FROM DATABASE

export function deleteTransaction(id) {
  return axios.delete(BACKEND_URL + `/transactions/${id}.json`);
}
