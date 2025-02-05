import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Start() {
  const [firstLoad, setFirstLoad] = useState(
    !sessionStorage.getItem("homeLoaded")
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("homeLoaded", "true");
      }, 2000);
    } else {
      setIsLoading(false);
    }
  }, []);

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

  return (
    <div className="w-full h-screen bg-[url('https://cdn.fs.teachablecdn.com/TrwXegtzTgmTovoDI0Ih')] bg-cover bg-center">
      <div className="w-full h-screen bg-black/45">
        <div className="absolute sm:w-[50%] w-[90%] py-1 bg-white left-1/2 top-10 rounded-full -translate-x-1/2 flex items-center justify-around ">
          <h3 className="sm:text-4xl text-xl font-mono uppercase">
            Complaint Management System
          </h3>
        </div>
        <div className="absolute sm:w-[75%] w-[95%] py-3 bg-white left-1/2 bottom-10 sm:rounded-full rounded -translate-x-1/2 flex flex-col sm:flex-row items-center justify-around sm:gap-10 gap-3 p-4">
          <Link
            to="/login"
            className="sm:text-xl sm:w-fit w-full text-center text-sm font-semibold font-mono bg-green-500 px-5 py-2 text-white rounded-full"
          >
            User Login
          </Link>
          <Link
            to="registration"
            className="sm:text-xl sm:w-fit  w-full text-center text-sm font-semibold font-mono bg-yellow-500 px-5 py-2 text-white rounded-full"
          >
            User Registration
          </Link>
          <Link
            to="admin-login"
            className="sm:text-xl sm:w-fit w-full text-center text-sm font-semibold font-mono bg-red-500 px-5 py-2 text-white rounded-full"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
