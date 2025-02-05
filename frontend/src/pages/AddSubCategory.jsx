import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

function AddSubCategory() {
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  let [count, setCount] = useState(1);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryid, setSelectedCategoryid] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    setError(null);
    setMessage("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/add-subCategory`,
        { subCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setMessage(res.data.message);
        setSubCategory("");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message || error.response.data.error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
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
    fetchCategories();
  }, [submitHandler]);

  const deleteSubCategory = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/admin/delete-subCategory/${selectedCategoryid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setMessage(res.data.message);
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
          <h3 className="sm:text-4xl text-2xl sm:text-left text-center   uppercase">Add your SubCategory</h3>
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
            <h3>Add SubCategory</h3>
            <form onSubmit={submitHandler} action="">
              <div className="mt-4">
                <h4 className="text-gray-600 mb-2">SubCategory</h4>
                <input
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  type="text"
                  placeholder="Enter Your SubCategory"
                  className="border-2 outline-none border-gray-500 sm:w-1/2 w-full p-2"
                />
              </div>
              <button className="text-lg mt-5 sm:w-fit w-full bg-blue-600 px-4 py-1 rounded text-white">
                Submit
              </button>
            </form>
          </div>
          <div
            style={{
              scrollbarWidth: "none", // Hide scrollbar for Firefox
              msOverflowStyle: "none", // Hide scrollbar for IE/Edge
            }}
            className="mt-10 overflow-auto h-72 scrollbar-none shadow-inner p-2"
          >
            {subCategories ? (
              <table className="w-full  border-collapse border border-gray-300 shadow-lg rounded-lg">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="text-left hidden sm:block px-6 py-3 border-b border-gray-300 font-semibold">
                      #
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      SubCategory
                    </th>
                    <th className="text-left hidden sm:block px-6 py-3 border-b border-gray-300 font-semibold">
                      Creation Date
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {subCategories.map((subCategory, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 hidden sm:block py-4 border-b border-gray-300 text-gray-700">
                        {count++}
                      </td>
                      <td className="sm:px-6 sm:py-4 py-2 px-3 border-b border-gray-300 text-gray-700">
                        {subCategory.subCategory}
                      </td>
                      <td className="px-6 hidden sm:block py-4 border-b border-gray-300 text-gray-700">
                        {subCategory.createdAt}
                      </td>
                      <td className="sm:px-6 sm:py-4 py-2 px-3 border-b border-gray-300 text-gray-700">
                        <Link
                          to={`/admin/edit-subCategory/${subCategory._id}`}
                          className="sm:px-4 sm:py-2 py-1 px-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedCategoryid(subCategory._id);
                            setShowModal(true);
                          }}
                          className="sm:px-4 sm:py-2 py-1 px-2 ml-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3 className="text-gray-400 text-2xl text-center">
                There is no SubCategories
              </h3>
            )}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
                  <h2 className="text-lg font-bold mb-4">
                    Are you sure you want to delete this SubCategory?
                  </h2>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        deleteSubCategory();
                        setShowModal(false);
                      }}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSubCategory;
