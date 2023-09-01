import { createContext, useReducer } from "react";

//TRANSACTIONS CONTEXT AND REDUCER
export const TransactionsContext = createContext({
  transactions: [],
  addTransactions: ({ amount, date, detail, sof, title, type }) => {},
  getTransactions: (transactions) => {},
  deleteTransactions: (id) => {},
  updateTransactions: (id, { amount, date, detail, sof, title, type }) => {},
});

const transactionsReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "GET":
      return action.payload.reverse();
    case "DELETE":
      return state.filter((transaction) => transaction.id !== action.payload);
    case "UPDATE":
      const updateableTransactionIndex = state.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      const updatebleTransaction = state[updateableTransactionIndex];
      const updatedItem = { ...updatebleTransaction, ...action.payload.data };
      const updatedTransactions = [...state];
      updatedTransactions[updateableTransactionIndex] = updatedItem;
      return updatedTransactions;
  }
};

const TransactionContexProvider = ({ children }) => {
  const [transactionsState, dispatch] = useReducer(transactionsReducer, []);

  const addTransactions = (transactionsData) => {
    dispatch({ type: "ADD", payload: transactionsData });
  };

  const getTransactions = (transactions) => {
    dispatch({ type: "GET", payload: transactions });
  };

  const deleteTransactions = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateTransactions = (id, transactionData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: transactionData } });
  };

  const transactionValue = {
    transactions: transactionsState,
    getTransactions: getTransactions,
    addTransactions: addTransactions,
    deleteTransactions: deleteTransactions,
    updateTransactions: updateTransactions,
  };

  return (
    <TransactionsContext.Provider value={transactionValue}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionContexProvider;
