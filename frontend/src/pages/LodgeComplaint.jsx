import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function LodgeComplaint() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [state, setState] = useState("");
  const [complaint, setComplaint] = useState("");
  const [complaintNature, setComplaintNature] = useState("");
  const [complaintDets, setComplaintDets] = useState("");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useContext(userDataContext);
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/get-all-category`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.log(error);
        setError(error.response.data.message || error.response.data.error);
      }
    };
    fetchCategories();

    const fetchSubCategory = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/get-all-subCategory`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          setSubCategories(res.data.subCategories);
        }
      } catch (error) {
        setError(error.response.data.message || error.response.data.error);
      }
    };
    fetchSubCategory();

    const fetchState = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/get-all-state`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          setStates(res.data.states);
        }
      } catch (error) {
        setError(error.response.data.message || error.response.data.error);
      }
    };
    fetchState();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setError(null);
    setMessage("");
    const details = {
      userId: user._id,
      category: category,
      subCategory: subCategory,
      complaintType: complaint,
      natureOfComplaint: complaintNature,
      state: state,
      complaintDetail: complaintDets,
    };
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/lodge-complaint`,
        details,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setMessage(res.data.message);
        setCategory("");
        setSubCategory("");
        setState("");
        setComplaint("");
        setComplaintNature("");
        setComplaintDets("");
        setTimeout(() => {
          navigate("/complaint-history");
        }, 1000);
      }
    } catch (error) {
      setError(error.response.data.message || error.response.data.errors);
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
          <h3 className="sm:text-4xl text-2xl text-center sm:text-left uppercase">
            lodge your complaint
          </h3>
          <div className="w-full sm:mt-20 mt-5">
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
            <h3>Register Complaint</h3>
            <form onSubmit={submitHandler} action="">
              <div className="flex flex-col sm:flex-row w-full sm:gap-10 gap-2">
                <div className="w-full">
                  <div className="mt-4">
                    <h4 className="text-gray-600 mb-2">Select Category</h4>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      type="text"
                      className="border-2 outline-none border-gray-500 w-full p-2"
                    >
                      <option className="w-20" value="" disabled>
                        Select Category
                      </option>
                      {categories.map((category, index) => (
                        <option
                          className="w-20"
                          key={index}
                          value={category.category}
                        >
                          {category.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4 w-full">
                    <h4 className="text-gray-600 mb-2">Select Sub Category</h4>
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="border-2 outline-none border-gray-500 w-full p-2"
                    >
                      <option value="" disabled>
                        Select Sub Category
                      </option>
                      {subCategories.map((subCategory, index) => (
                        <option key={index} value={subCategory.subCategory}>
                          {subCategory.subCategory}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4 w-full">
                    <h4 className="text-gray-600 mb-2">
                      Select Complaint Type
                    </h4>
                    <select
                      value={complaint}
                      onChange={(e) => setComplaint(e.target.value)}
                      type="text"
                      className="border-2 outline-none border-gray-500 w-full p-2"
                    >
                      <option value="" disabled>
                        Select Complaint Type
                      </option>
                      <option value="Complaint">Complaint</option>
                      <option value="General Query">General Query</option>
                    </select>
                  </div>
                  <div className="mt-4 w-full">
                    <h4 className="text-gray-600 mb-2">Select State</h4>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      className="border-2 outline-none border-gray-500 w-full p-2"
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {states.map((state, index) => (
                        <option key={index} value={state.state}>
                          {state.state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <div className="mt-4 w-full">
                    <h4 className="text-gray-600 mb-2">Nature of Complaint</h4>
                    <input
                      value={complaintNature}
                      onChange={(e) => setComplaintNature(e.target.value)}
                      type="text"
                      className="border-2 outline-none border-gray-500 w-full p-2"
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <h4 className="text-gray-600 mb-2">
                      Complaint Details (max 2000 words)
                    </h4>
                    <textarea
                      value={complaintDets}
                      onChange={(e) => setComplaintDets(e.target.value)}
                      type="text"
                      className="border-2 outline-none border-gray-500 w-full h-32 p-2"
                    ></textarea>
                  </div>
                  <button className="text-lg mt-9 w-full bg-blue-600 px-4 py-1 rounded text-white">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LodgeComplaint;
