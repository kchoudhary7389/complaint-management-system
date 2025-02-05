import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuthRole } from "../utils/authRole";
import axios from "axios";

function UpdateProfile() {
  const { data } = useAuthRole();
  const [fullname, setFullname] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          setFullname(res.data.user.fullname);
          setContact(res.data.user.contactno);
        }
      } catch (error) {
        setError(error.response.data.message || error.response.data.error);
      }
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setError(null);
    setMessage("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/update-profile`,
        { fullname, contactno: contact },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      setError(error.response.data.message || error.response.data.error);
    }
  };

  return (
    <div className="font-['ubuntu']">
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-5">
        <Sidebar />
        <div className="p-5 w-full">
          <h3 className="sm:text-4xl text-2xl text-center sm:text-left uppercase">
            update profile
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
          <form action="" onSubmit={submitHandler}>
            <div className="w-full mt-10">
              <h3 className="sm:text-xl text-lg">{data.fullname}'s Profile</h3>
              <div className="mt-4">
                <h4 className="text-gray-600 mb-2">Full Name</h4>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  type="text"
                  placeholder="Enter Your Category"
                  className="border-2 outline-none border-gray-500 sm:w-1/2 w-full p-2"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-gray-600 mb-2">Contact No</h4>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  type="text"
                  placeholder="Enter Your Category"
                  className="border-2 outline-none border-gray-500 sm:w-1/2 w-full p-2"
                />
              </div>
              <button className="text-white sm:w-fit w-full bg-blue-600 py-2 px-4 rounded inline-block mt-5">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
