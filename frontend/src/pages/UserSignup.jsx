import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

function UserSignup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(userDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    if (!fullname || !email || !password || !contact) {
      setError("All fields are required.");
      return;
    }
    const user = {
      fullname,
      email,
      password,
      contactno: contact,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        user
      );

      console.log(res);
      if (res.status === 200) {
        const data = res.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
        setFullname("");
        setEmail("");
        setPassword("");
        setContact("");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message || error.response.data.errors);
      } else {
        setError("Something went wrong");
      }
    }

   
  };
  return (
    <div className="w-full h-screen overflow-hidden bg-sky-300 flex items-center justify-center ">
      <div className=" relative sm:rounded-lg rounded-none bg-white sm:w-[30%] w-full sm:h-fit h-full flex items-center">
        <div className="w-[100%] bg-white sm:p-10 p-4 sm:rounded-lg rounded-none">
          {error && Array.isArray(error)
            ? error.map((err, index) => (
                <p key={index} className="text-sm text-white text-center bg-red-500 w-full">
                  {err.msg}
                </p>
              ))
            : error && (
                <p className="text-sm text-white bg-red-500 w-full">{error}</p>
              )}
          <div className="flex items-center text-sky-500 justify-between">
            <h1 className="sm:text-3xl text-xl">SIGN UP HERE</h1>
          </div>
          <div className="">
            <form onSubmit={submitHandler} action="">
              <div className="mt-3">
                <h4 className="text-gray-600 tracking-widest py-2 sm:text-base text-sm">
                  FULL NAME
                </h4>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full bg-gray-100 shadow-lg p-2 rounded outline-none"
                  placeholder="Enter Your Full Name"
                />
              </div>
              <div className="mt-3">
                <h4 className="text-gray-600 tracking-widest py-2 sm:text-base text-sm">EMAIL</h4>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 shadow-lg p-2 rounded outline-none"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="mt-2 relative">
                <h4 className="text-gray-600 tracking-widest py-2 sm:text-base text-sm">PASSWORD</h4>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 shadow-lg p-2 rounded outline-none"
                  placeholder="Enter Your Password"
                />
                 {showPassword ? (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ri-eye-line text-gray-600 absolute sm:text-xl text-lg right-2 sm:top-12 top-10 cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ri-eye-off-line text-gray-600 absolute sm:text-xl text-lg right-2 sm:top-12 top-10 cursor-pointer"
                  ></i>
                )}
              </div>
              <div className="mt-3">
                <h4 className="text-gray-600 tracking-widest py-2 sm:text-base text-sm">
                  CONTACT NO
                </h4>
                <input
                  type="number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-gray-100 shadow-lg p-2 rounded outline-none"
                  placeholder="Enter Your Contact Number"
                />
              </div>
              <div className="mt-2 sm:text-base text-sm flex gap-1 justify-end">
                <p>Already Have an Account </p>
                <Link to="/login" className="text-blue-600 inline-block">
                  {" "}
                  Login here?
                </Link>
              </div>
              <button className="text-xl w-full py-1 mt-5 font-mono text-white rounded bg-blue-500">
                Sign Up
              </button>
              <Link
                to="/"
                className="text-blue-500 inline-block text-center w-full mt-3"
              >
                Back to Home
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
