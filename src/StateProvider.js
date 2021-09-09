import React, { createContext, useContext, useReducer } from "react";

// Prepare the data layer
export const StateContext = createContext();

// Wrap the app and provide the data layer
export const StateProvider = ({ reducer, inititalState, children }) => (
  <StateContext.Provider value={useReducer(reducer, inititalState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
