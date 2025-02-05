import { useState, createContext } from "react";

export const userDataContext = createContext();
function UserContext({ children }) {
  const [user, setUser] = useState({});
  return (
    <userDataContext.Provider value={{ user, setUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
