import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ComplaintDetails() {
  let [count, setCount] = useState(1);
  const [complaintDetails, setComplaintDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [remarkList, setRemarkList] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/complaint-details/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          setComplaintDetails([res.data.complaintDetails]);
          setRemarkList(res.data.remark);
          console.log(res.data)
        }
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };
    fetchComplaintDetails();
  }, [id]);

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
          <h3 className="sm:text-4xl text-2xl text-center sm:text-left uppercase">complaint details</h3>
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

          <table className="w-full  mt-10 border border-gray-300 shadow-lg rounded-lg overflow-hidden hidden sm:table">
            {complaintDetails.map((detail, index) => (
              <tbody key={index} className="bg-white divide-y divide-gray-300">
                {/* Row 1 */}
                <tr className="bg-gray-100 text-gray-800">
                  <th className="px-6 py-3 text-left font-semibold">
                    Full Name
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    {detail.userId.fullname}
                  </td>
                  <th className="px-6 py-3 text-left font-semibold">Email</th>
                  <td className="px-6 py-4 text-gray-700">
                    {detail.userId.email}
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">
                    Category
                  </th>
                  <td className="px-6 py-4 text-gray-700">{detail.category}</td>
                  <th className="px-6 py-3 text-left font-semibold">
                    SubCategory
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    {detail.subCategory}
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">
                    Complaint Type
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    {detail.complaintType}
                  </td>
                  <th className="px-6 py-3 text-left font-semibold">
                    Nature of Complaint
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    {detail.natureOfComplaint}
                  </td>
                </tr>

                {/* Row 4 */}
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">State</th>
                  <td className="px-6 py-4 text-gray-700">{detail.state}</td>
                  <th className="px-6 py-3 text-left font-semibold">
                    Complaint Details
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    {detail.complaintDetail}
                  </td>
                </tr>

                {/* Row 5 */}
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">
                    Creation Date
                  </th>
                  <td className="px-6 py-4 text-gray-700">
                    {detail.createdAt}
                  </td>
                  <th className="px-6 py-3 text-left font-semibold">
                    Updation Date
                  </th>
                  <td className="px-6 py-2 text-white text-sm">
                    <span
                      className={`inline-block px-4 py-1 rounded-md ${
                        detail.status === "Not processed yet"
                          ? "bg-red-500"
                          : detail.status === "In process"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {detail.status}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th className="px-6 py-3 text-left font-semibold ">S No.</th>
                  <th className="px-6 py-3 text-left font-semibold ">Remark</th>
                  <th className="px-6 py-3 text-left font-semibold ">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Updation Date
                  </th>
                </tr>
                {remarkList > 0 ? (
                  remarkList.map((r, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-gray-700">{count++}</td>
                      <td className="px-6 py-4 text-gray-700">{r.remark}</td>
                      <td className="px-6 py-4 text-gray-700">{r.status}</td>
                      <td className="px-6 py-4 text-gray-700">{r.updatedAt}</td>
                    </tr>
                  ))
                ) : (
                  <td className="text-center">There is no Remark yet</td>
                )}
              </tbody>
            ))}
          </table>
          <div className="sm:hidden block">
            {complaintDetails.map((detail, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 mb-5"
              >
                <p className="font-semibold">
                  Full Name:{" "}
                  <span className="text-gray-700">
                    {detail.userId.fullname}
                  </span>
                </p>
                <p className="font-semibold">
                  Email:{" "}
                  <span className="text-gray-700">{detail.userId.email}</span>
                </p>
                <p className="font-semibold">
                  Category:{" "}
                  <span className="text-gray-700">{detail.category}</span>
                </p>
                <p className="font-semibold">
                  SubCategory:{" "}
                  <span className="text-gray-700">{detail.subCategory}</span>
                </p>
                <p className="font-semibold">
                  Complaint Type:{" "}
                  <span className="text-gray-700">{detail.complaintType}</span>
                </p>
                <p className="font-semibold">
                  Nature of Complaint:{" "}
                  <span className="text-gray-700">
                    {detail.natureOfComplaint}
                  </span>
                </p>
                <p className="font-semibold">
                  State: <span className="text-gray-700">{detail.state}</span>
                </p>
                <p className="font-semibold">
                  Complaint Details:{" "}
                  <span className="text-gray-700">
                    {detail.complaintDetail}
                  </span>
                </p>
                <p className="font-semibold">
                  Creation Date:{" "}
                  <span className="text-gray-700">
                    {new Date(detail.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p className="font-semibold">
                  Status:
                  <span
                    className={`inline-block px-2 py-0 rounded-md ml-2 text-white ${
                      detail.status === "Not processed yet"
                        ? "bg-red-500"
                        : detail.status === "In process"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {detail.status}
                  </span>
                </p>
              </div>
            ))}

            <h4 className="text-2xl font-semibold mt-5">Remarks</h4>
            {remarkList.length > 0 ? (
              remarkList.map((r, index) => (
                <div
                  key={index}
                  className="bg-gray-100 shadow-md p-4 mt-3 rounded-md"
                >
                  <p className="font-semibold">
                    S No.: <span className="text-gray-700">{index + 1}</span>
                  </p>
                  <p className="font-semibold">
                    Remark: <span className="text-gray-700">{r.remark}</span>
                  </p>
                  <p className="font-semibold">
                    Status: <span className="text-gray-700">{r.status}</span>
                  </p>
                  <p className="font-semibold">
                    Updation Date:{" "}
                    <span className="text-gray-700">
                      {new Date(r.updatedAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 mt-3">There is no Remark yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;
