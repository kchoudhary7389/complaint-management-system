import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { adminDataContext } from "../context/AdminContext";

export const useAuthRole = () => {
  const { user, setUser } = useContext(userDataContext);
  const { admin, setAdmin } = useContext(adminDataContext);

  if (admin?.email) return { role: "admin", data: admin };
  if (user?.email) return { role: "user", data: user };
  return { role: null, data: null };
};
