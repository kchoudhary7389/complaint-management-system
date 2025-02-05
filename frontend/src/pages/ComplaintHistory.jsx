import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

function ComplaintHistory() {
  let [count, setCount] = useState(1);
  let [count2, setCount2] = useState(1);
  const [complaints, setcomplaints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedcomplaintid, setSelectedcomplaintid] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const deleteComplaint = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/users/delete-complaint/${selectedcomplaintid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);
      if (res.status === 200) {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message || error.response.data.error);
    }
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/complaint-history`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          setcomplaints(res.data.complaints);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    fetchComplaints();
  }, [deleteComplaint]);

  return (
    <div className="font-['ubuntu']">
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="bg-gray-900">
          <Sidebar />
        </div>
        <div className="p-5 w-full">
          <h3 className="sm:text-4xl text-2xl sm:text-left text-center uppercase">
            complaint history
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
          {complaints.length > 0 ? (
            <table className="w-full mt-20  border-collapse border border-gray-300 shadow-lg rounded-lg hidden sm:table">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="text-center px-6 py-3 border-b border-gray-300 font-semibold">
                    #
                  </th>
                  <th className="text-center px-6 py-3 border-b border-gray-300 font-semibold">
                    Full Name
                  </th>
                  <th className="text-center px-6 py-3 border-b border-gray-300 font-semibold">
                    Creation Date
                  </th>
                  <th className="text-center px-6 py-3 border-b border-gray-300 font-semibold">
                    Status
                  </th>
                  <th className="text-center px-6 py-3 border-b border-gray-300 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {complaints.map((complaint, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 text-center py-4 border-b border-gray-300 text-gray-700">
                      {count++}
                    </td>
                    <td className="px-6 text-center py-4 border-b border-gray-300 text-gray-700">
                      {complaint.userId.fullname}
                    </td>
                    <td className="px-6 text-center py-4 border-b border-gray-300 text-gray-700">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 text-center py-4 border-b border-gray-300 text-gray-700">
                      <div
                        className={`${
                          complaint.status === "Not processed yet"
                            ? "bg-red-500"
                            : complaint.status === "In process"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        } text-white inline-block p-1 rounded text-sm`}
                      >
                        {" "}
                        {complaint.status}
                      </div>
                    </td>

                    <td className="px-6 text-center py-4 border-b border-gray-300 text-gray-700">
                      <button
                        onClick={() => {
                          setSelectedcomplaintid(complaint._id);
                          setShowModal(true);
                        }}
                        className="px-4 py-2 ml-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/complaint-details/${complaint._id}`}
                        className="px-4 inline-block py-2 ml-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className="text-gray-400 text-2xl text-center">
              There is no Complaints
            </h3>
          )}
          <div className="sm:hidden block mt-10">
            {complaints.map((complaint, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md"
              >
                <p className="text-gray-700 py-1">
                  <span className="font-semibold">#:</span> {count2++}
                </p>
                <p className="text-gray-700 py-1">
                  <span className="font-semibold">Full Name:</span>{" "}
                  {complaint.userId.fullname}
                </p>
                <p className="text-gray-700 py-1">
                  <span className="font-semibold">Creation Date:</span>{" "}
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 py-1">
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                      complaint.status === "Not processed yet"
                        ? "bg-red-500"
                        : complaint.status === "In process"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </p>
                <div className="flex justify-start gap-4 mt-3">
                  <button
                    onClick={() => {
                      setSelectedcomplaintid(complaint._id);
                      setShowModal(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/complaint-details/${complaint._id}`}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {showModal && (
            <div className="fixed inset-0 flex px-2 items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
                <h2 className="text-lg font-bold mb-4">
                  Are you sure you want to delete this Complaint?
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
                      deleteComplaint();
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
  );
}

export default ComplaintHistory;
