import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditCategory() {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/category/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          setCategory(res.data.category.category);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
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
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/edit-category/${id}`,
        { category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate("/add-category");
        }, 2000);
      }
    } catch (error) {
      setError(error.response.data.message || error.response.data.error);
    }
  };

  return (
    <div className="font-['ubuntu']">
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="bg-gray-900">
          <Sidebar />
        </div>
        <div className="p-5 w-full">
          <h3 className="sm:text-4xl text-2xl text-center sm:text-left uppercase">
            Edit your Category
          </h3>
          <div className="w-full mt-10">
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
            <h3>Edit Category</h3>
            <form onSubmit={submitHandler} action="">
              <div className="mt-4">
                <h4 className="text-gray-600 mb-2">Category</h4>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                  placeholder="Enter Your Category"
                  className="border-2 outline-none border-gray-500 sm:w-1/2 w-full p-2"
                />
              </div>
              <button className="text-lg sm:w-fit w-full mt-5 bg-blue-600 px-4 py-1 rounded text-white">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
