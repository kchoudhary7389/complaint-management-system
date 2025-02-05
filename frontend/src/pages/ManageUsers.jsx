import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  let [count, setCount] = useState(1);
  let [count2, setCount2] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserid, setSelectedUserid] = useState(false);
  const [message, setMessage] = useState("");

  const deleteUser = async () => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/admin/delete-user/${selectedUserid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/get-all-users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setUsers(res.data.users);
      }
    };
    fetchUsers();
  }, [deleteUser]);

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
            Manage users
          </h3>
          <div className="w-full sm:mt-20 mt-5">
            {users.length > 0 ? (
              <table className="w-full hidden sm:block border-collapse border border-gray-300 shadow-lg rounded-lg">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      #
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Full Name
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Email
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Contact No
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Creation Date
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-300 font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        {count++}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        {user.fullname}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        {user.contactno}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        {user.createdAt}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        <button
                          onClick={() => {
                            setSelectedUserid(user._id);
                            setShowModal(true);
                          }}
                          className="px-4 py-2 ml-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/manage-users/complaints/${user._id}`}
                          className="px-4 inline-block py-2 ml-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                        >
                          Complaints
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
              {users.map((user, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md"
                >
                  <p className="text-gray-700 py-1">
                    <span className="font-semibold">#:</span> {count2++}
                  </p>
                  <p className="text-gray-700 py-1">
                    <span className="font-semibold">Full Name:</span>{" "}
                    {user.fullname}
                  </p>
                  <p className="text-gray-700 py-1">
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-700 py-1">
                    <span className="font-semibold">Contact No:</span>{" "}
                    {user.contactno}
                  </p>
                  <p className="text-gray-700 py-1">
                    <span className="font-semibold">Creation Date:</span>{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex justify-start gap-4 mt-3">
                    <button
                      onClick={() => {
                        setSelectedUserid(user._id);
                        setShowModal(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/manage-users/complaints/${user._id}`}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                    >
                      Complaints
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {showModal && (
              <div className="fixed px-2 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
                  <h2 className="text-lg font-bold mb-4">
                    Are you sure you want to delete this User?
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
                        deleteUser();
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

export default ManageUsers;
