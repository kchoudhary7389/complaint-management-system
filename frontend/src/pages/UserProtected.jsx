import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { motion } from "framer-motion";

function UserProtected({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(userDataContext);
  const [firstLoad, setFirstLoad] = useState(
    !sessionStorage.getItem("userLoaded")
  );
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          setUser(data.user);
        }
        if (firstLoad) {
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("userLoaded", "true");
          }, 2000);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F5F5F5]">
        <motion.div
          className="w-16 h-16 border-4 border-t-transparent border-l-[#3498db] border-r-[#9b59b6] border-b-[#3498db] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  return <>{children}</>;
}

export default UserProtected;
