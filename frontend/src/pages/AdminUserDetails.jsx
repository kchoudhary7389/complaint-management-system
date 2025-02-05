import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function AdminUserDetails() {
  const [fullname, setFullname] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/userProfile/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          const data = res.data.user;
          setFullname(data.fullname);
          setEmail(data.email);
          setContact(data.contactno);
        }
      } catch (error) {
        console.log(error);
        setError(error.response.data.message || error.response.data.error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="font-['ubuntu']">
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-5">
        <Sidebar />
        <div className="p-5 w-full">
          <h3 className="sm:text-4xl text-2xl sm:text-left text-center uppercase">
            User's profile
          </h3>
          <div className="w-full mt-10">
            <h3 className="sm:text-xl text-lg">{fullname}'s Profile</h3>
            <div className="mt-4">
              <h4 className="text-gray-600 mb-2">Full Name</h4>
              <input
                value={fullname}
                type="text"
                disabled
                placeholder="Enter Your Category"
                className="border-2 outline-none border-gray-500 sm:w-1/2 w-full p-2"
              />
            </div>
            <div className="mt-4">
              <h4 className="text-gray-600 mb-2">Contact No</h4>
              <input
                value={contact}
                type="text"
                disabled
                placeholder="Enter Your Category"
                className="border-2 outline-none border-gray-500 sm:w-1/2 w-full p-2"
              />
            </div>
            <div className="mt-4">
              <h4 className="text-gray-600 mb-2">Email</h4>
              <input
                value={email}
                type="text"
                disabled
                placeholder="Enter Your Category"
                className="border-2 outline-none border-gray-500 sm:w-1/2 w-full p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserDetails;
