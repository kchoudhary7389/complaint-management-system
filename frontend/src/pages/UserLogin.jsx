import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useContext(userDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    const user = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        user
      );

      if (res.status === 200) {
        const data = res.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-sky-300 flex items-center justify-center p-2 ">
      <div className=" relative rounded-lg bg-white sm:w-[30%] py-5 w-full flex items-center">
        <div className="w-full bg-white sm:p-10 p-2 rounded-lg">
          {error && (
            <p className="text-center bg-red-500 rounded py-1 text-white">
              {error}
            </p>
          )}
          <div className="flex items-center text-sky-500 justify-between">
            <h1 className="text-xl sm:text-3xl">LOGIN HERE</h1>
          </div>
          <div className="">
            <form onSubmit={submitHandler} action="">
              <div className="mt-3">
                <h4 className="text-gray-600 text-xs sm:text-base  tracking-widest py-2">EMAIL</h4>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full shadow-lg bg-[#eee] p-2 rounded outline-none"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="mt-2 relative">
                <h4 className="text-gray-600 text-xs sm:text-base  tracking-widest py-2">PASSWORD</h4>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full shadow-lg bg-[#eee] p-2 rounded outline-none"
                  placeholder="Enter Your Password"
                />
                {showPassword ? (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ri-eye-line absolute sm:text-xl text-lg right-2 sm:top-12 top-10 cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ri-eye-off-line absolute sm:text-xl text-lg right-2 sm:top-12 top-10 cursor-pointer"
                  ></i>
                )}
              </div>
              <div className="flex items-center text-sm sm:text-base justify-between mt-2">
                <Link to="/" className="text-gray-500">
                  Back to Home
                </Link>
                <Link to="/forgot-password" className="text-blue-600">
                  Forgot Password?
                </Link>
              </div>
              <button className="text-xl w-full py-1 mt-5 font-mono text-white rounded-lg bg-blue-500">
                Login
              </button>
              <h1 className="mt-2 text-center sm:text-base text-sm">
                Have'nt an Account?{" "}
                <Link to="/registration" className="text-blue-500">
                  Create Account{" "}
                </Link>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
