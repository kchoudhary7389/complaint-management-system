import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { useContext } from "react";
import { adminDataContext } from "../context/AdminContext";

export const logout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userDataContext);
  const logoutHandler = async () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
          setUser(null);
        }
      });
  };
  return logoutHandler;
};
export const adminLogout = () => {
  const navigate = useNavigate();
  const { admin, setAdmin } = useContext(adminDataContext);
  const logoutHandler = async () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/admin/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          navigate("/admin-login");
          setAdmin(null);
        }
      });
  };
  return logoutHandler;
};
