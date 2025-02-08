import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { adminDataContext } from "../context/AdminContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { admin, setAdmin } = useContext(adminDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    const admin = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        admin
      );

      if (res.status === 200) {
        const data = res.data;
        setAdmin(data.admin);
        localStorage.setItem("token", data.token);
        navigate("/admin-home");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
    setLoading(false);

    setEmail("");
    setPassword("");
  };
  return (
    <div className="w-full h-screen overflow-hidden bg-sky-300 flex p-2 items-center justify-center ">
      <div className=" relative rounded-lg bg-white sm:w-[30%] w-full flex items-center">
        <div className="w-[100%] bg-white sm:p-10 p-2 rounded-lg">
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
          <div className="flex items-center text-sky-500 justify-between">
            <h1 className="text-xl sm:text-3xl">ADMIN LOGIN</h1>
          </div>
          <div className="">
            <form onSubmit={submitHandler} action="">
              <div className="mt-3">
                <h4 className="text-gray-600 text-sm sm:text-base tracking-widest py-2">
                  EMAIL
                </h4>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#eee] p-2 rounded outline-none"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="mt-2 relative">
                <h4 className="text-gray-600 text-sm sm:text-base tracking-widest py-2">
                  PASSWORD
                </h4>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#eee] p-2 rounded outline-none"
                  placeholder="Enter Your Password"
                />
                {showPassword ? (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ri-eye-line absolute sm:text-xl text-lg right-2 sm:top-12 top-[42px] cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ri-eye-off-line absolute sm:text-xl text-lg right-2 sm:top-12 top-[42px] cursor-pointer"
                  ></i>
                )}
              </div>
              <div className="flex items-center justify-end mt-2">
                <Link to="/admin-forgot-password" className="text-blue-600">
                  Forgot Password?
                </Link>
              </div>
              <button className="text-xl w-full py-1 flex justify-center items-center mt-5 font-mono text-white rounded-lg bg-blue-500">
                {loading ? (
                  <svg
                    className="animate-spin h-7 w-7 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="white"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                    />
                  </svg>
                ) : (
                  "Login"
                )}{" "}
              </button>
              <h1 className="mt-2 text-center">
                <Link to="/" className="text-blue-500">
                  Back to Home{" "}
                </Link>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
