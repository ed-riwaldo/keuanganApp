import { createContext, useReducer } from "react";

export const SourceOfFundContext = createContext({
  sourceOfFund: [],
  addSourceOfFund: ({ accountName, balance, Addeddate }) => {},
  getSourceOfFund: (sourceOfFund) => {},
  deleteSourceOfFund: (id) => {},
  updateSourceOfFund: (id, { accountName, balance, Addeddate }) => {},
});

const SourceOfFundReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "GET":
      return action.payload.reverse();
    case "DELETE":
      return state.filter((sourceOfFund) => sourceOfFund.id !== action.payload);
    case "UPDATE":
      const updatableSourceOfFundIndex = state.findIndex(
        (sourceOfFund) => sourceOfFund.id === action.payload.id
      );
      const updateSourceOfFund = state[updatableSourceOfFundIndex];
      const updatedItem = { ...updateSourceOfFund, ...action.payload.data };
      const updatedSoF = [...state];
      updatedSoF[updatableSourceOfFundIndex] = updatedItem;
      return updatedSoF;
  }
};

const SourceOfFundContexProvider = ({ children }) => {
  const [sourceOfFundState, dispatch] = useReducer(SourceOfFundReducer, []);

  const addSourceOfFund = (deleteSourceOfFundData) => {
    dispatch({ type: "ADD", payload: deleteSourceOfFundData });
  };

  const getSourceOfFund = (SourceOfFunds) => {
    dispatch({ type: "GET", payload: SourceOfFunds });
  };

  const deleteSourceOfFund = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateSourceOfFund = (id, sourceOfFundData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: sourceOfFundData } });
  };

  const value = {
    sourceOfFund: sourceOfFundState,
    addSourceOfFund: addSourceOfFund,
    getSourceOfFund: getSourceOfFund,
    deleteSourceOfFund: deleteSourceOfFund,
    updateSourceOfFund: updateSourceOfFund,
  };
  return (
    <SourceOfFundContext.Provider value={value}>
      {children}
    </SourceOfFundContext.Provider>
  );
};

export default SourceOfFundContexProvider;
