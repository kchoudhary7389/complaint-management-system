import { useState, createContext } from "react";

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [admin, setAdmin] = useState({});
  return (
    <adminDataContext.Provider value={{ admin, setAdmin }}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
