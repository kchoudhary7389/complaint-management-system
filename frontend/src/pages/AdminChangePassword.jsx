import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function AdminChangePassword() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    setError("");
    setMessage("");
    if (newPass !== confirmPass) {
      setError("New Password and confirm Password does not match");
      return;
    }

    const passwords = {
      currentPassword: currentPass,
      newPassword: newPass,
    };

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/change-password`,
        passwords,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res);
      if (res.status === 200) {
        setMessage(res.data.message);
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message || error.response.data.error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="font-['ubuntu']">
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="bg-gray-900">
          <Sidebar />
        </div>
        <div className="p-5 w-full">
          <h3 className="text-2xl sm:text-4xl sm:text-left text-center uppercase">
            Change Your Password
          </h3>
          {message && (
            <p className="text-sm text-white p-2 text-center bg-green-500 w-full">
              {message}
            </p>
          )}
          {error && Array.isArray(error)
            ? error.map((err, index) => (
                <p
                  key={index}
                  className="text-sm text-white p-2 text-center bg-red-500 w-full"
                >
                  {err.msg}
                </p>
              ))
            : error && (
                <p className="text-sm text-white p-2 text-center bg-red-500 w-full">
                  {error}
                </p>
              )}
          <div className="w-full sm:mt-20 mt-5">
            <h3>Change Password</h3>
            <form onSubmit={submitHandler} action="">
              <div className="mt-4 relative">
                <h4 className="text-gray-600 mb-2">Current Password</h4>
                <input
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="Enter Your Current Password"
                  type={showCurrentPassword ? "text" : "password"}
                  className="border-2 outline-none border-gray-500 sm:w-1/2 w-full p-2"
                />
                {showCurrentPassword ? (
                  <i
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="ri-eye-line text-gray-600 absolute text-xl sm:left-[48%] left-[95%] -translate-x-1/2 top-10 cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="ri-eye-off-line text-gray-600 absolute text-xl sm:left-[48%] left-[95%] -translate-x-1/2 top-10 cursor-pointer"
                  ></i>
                )}
              </div>
              <div className="mt-4 relative">
                <h4 className="text-gray-600 mb-2">New Password</h4>
                <input
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Enter Your New Password"
                  type={showPassword ? "text" : "password"}
                  className="border-2 outline-none border-gray-500 sm:w-1/2 w-full p-2"
                />
                {showPassword ? (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ri-eye-line text-gray-600 absolute text-xl sm:left-[48%] left-[95%] -translate-x-1/2 top-10 cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ri-eye-off-line text-gray-600 absolute text-xl sm:left-[48%] left-[95%] -translate-x-1/2 top-10 cursor-pointer"
                  ></i>
                )}
              </div>
              <div className="mt-4 relative">
                <h4 className="text-gray-600 mb-2">Confirm Password</h4>
                <input
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Enter Your Confirm Password"
                  type={showPassword ? "text" : "password"}
                  className="border-2 outline-none border-gray-500 sm:w-1/2 w-full p-2"
                />
                {showPassword ? (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ri-eye-line text-gray-600 absolute text-xl sm:left-[48%] left-[95%] -translate-x-1/2 top-10 cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ri-eye-off-line text-gray-600 absolute text-xl sm:left-[48%] left-[95%] -translate-x-1/2 top-10 cursor-pointer"
                  ></i>
                )}
              </div>
              <button className="text-lg mt-4 sm:w-fit w-full bg-blue-600 px-4 py-1 rounded text-white">
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminChangePassword;
