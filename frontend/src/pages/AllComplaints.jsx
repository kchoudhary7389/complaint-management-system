import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  let [count, setCount] = useState(1);
  let [count2, setCount2] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/get-all-complaints`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setComplaints(res.data.complaints);
      }
    };
    fetchUsers();
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
            All complaints
          </h3>
          <div className="w-full mt-20">
            {complaints.length > 0 ? (
              <table className="w-full hidden sm:table border-collapse border border-gray-300 shadow-lg rounded-lg">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      #
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Complainant Name
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Complaint Type
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Creation Date
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {complaints.map((complaint, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        {count++}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        {complaint.userId.fullname}
                      </td>

                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        {complaint.complaintType}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        {complaint.createdAt}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        <span
                          className={`inline-block px-4 py-1 text-white rounded-md ${
                            complaint.status === "Not processed yet"
                              ? "bg-red-500"
                              : complaint.status === "In process"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        >
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        <Link
                          to={`/admin/complaint-details/${complaint._id}`}
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
                There is no Users
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
                    <span className="font-semibold">Complaint Type:</span>{" "}
                    {complaint.complaintType}
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
                    <Link
                      to={`/admin/complaint-details/${complaint._id}`}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllComplaints;
