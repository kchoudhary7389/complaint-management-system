import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (newPassword !== confirmPassword) {
      setError("New Password and confirm Password does not match");
      return;
    }

    const details = {
      email: email,
      contactno: contact,
      newPassword: newPassword,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/forgot-password`,
        details
      );
      console.log(res);
      if (res.status === 200) {
        setMessage(res.data.message);
        setEmail("");
        setConfirmPassword("");
        setContact("");
        setNewPassword("");
      }
    } catch (error) {
      setError(error.response.data.message || error.response.data.error);
    }
  };
  return (
    <div className="w-full h-screen overflow-hidden bg-sky-300 flex items-center justify-center ">
      <div className=" relative rounded-lg bg-white w-[30%] flex items-center">
        <div className="w-[100%] bg-white p-10 rounded-lg">
          <div className="flex items-center text-sky-500 justify-between">
            <h1 className=" text-3xl">RECOVER PASSWORD</h1>
          </div>
          {error && Array.isArray(error)
            ? error.map((err, index) => (
                <p
                  key={index}
                  className="text-sm text-white text-center bg-red-500 w-full"
                >
                  {err.msg}
                </p>
              ))
            : error && (
                <p className="text-sm text-white bg-red-500 w-full">{error}</p>
              )}
          {message && (
            <p className="text-center bg-green-500 rounded py-1 text-white">
              {message}
            </p>
          )}
          <div className="">
            <form onSubmit={submitHandler} action="">
              <div className="mt-3">
                <h4 className="text-gray-600 tracking-widest py-2">EMAIL</h4>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full shadow-lg bg-[#eee] p-2 rounded outline-none"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="mt-2">
                <h4 className="text-gray-600 tracking-widest py-2">CONTACT</h4>
                <input
                  required
                  type="number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full shadow-lg bg-[#eee] p-2 rounded outline-none"
                  placeholder="Enter Your Contact"
                />
              </div>
              <div className="mt-2 relative">
                <h4 className="text-gray-600 tracking-widest py-2">
                  NEW PASSWORD
                </h4>
                <input
                  required
                  type={showPassword ? "text" : "password" }
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full shadow-lg bg-[#eee] p-2 rounded outline-none"
                  placeholder="Enter Your new Password"
                />
                {showPassword ? (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    class="ri-eye-line text-gray-600 absolute text-xl right-2 top-12 cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    class="ri-eye-off-line text-gray-600 absolute text-xl right-2 top-12 cursor-pointer"
                  ></i>
                )}
              </div>
              <div className="mt-2 relative">
                <h4 className="text-gray-600 tracking-widest py-2">
                  CONFIRM PASSWORD
                </h4>
                <input
                  required
                  type={showPassword ? "text" : "password" }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full shadow-lg bg-[#eee] p-2 rounded outline-none"
                  placeholder="Enter Your confirm Password"
                />
                {showPassword ? (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    class="ri-eye-line text-gray-600 absolute text-xl right-2 top-12 cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    class="ri-eye-off-line text-gray-600 absolute text-xl right-2 top-12 cursor-pointer"
                  ></i>
                )}
              </div>
              <div className="flex items-center justify-end mt-2">
                <Link to="/" className="text-blue-500">
                  Back to Home
                </Link>
              </div>
              <button className="text-xl w-full py-1 mt-5 font-mono text-white rounded-lg bg-blue-500">
                Login
              </button>
              <h1 className="mt-2 text-center">
                Password Updated?
                <Link to="/login" className="text-blue-500">
                  Login here{" "}
                </Link>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
