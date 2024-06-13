import React, { createContext, useState } from "react";

const POContext = createContext();

export const POProvider = ({ children }) => {
  const [poNumber, setPONumber] = useState("");

  return (
    <POContext.Provider value={{ poNumber, setPONumber }}>
      {children}
    </POContext.Provider>
  );
};

export const usePO = () => React.useContext(POContext);
