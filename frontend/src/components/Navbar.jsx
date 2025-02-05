import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { logout, adminLogout } from "../utils/logout";
import { Link } from "react-router-dom";
import { useAuthRole } from "../utils/authRole";

function Navbar() {
  const logoutHandler = logout();
  const adminLogoutHandler = adminLogout();
  const { user, setUser } = useContext(userDataContext);
  const { role } = useAuthRole();
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <div className="w-full font-['ubuntu'] sm:h-16 h-10 bg-[#111827] text-white sm:px-10 px-3">
      <div className="flex h-full w-full items-center justify-between">
        <h1 className="sm:text-2xl text-lg">
          Welcome <span className="font-medium">{role === "admin" ? "Admin" : user.fullname}</span>
        </h1>
        <div className="flex items-center justify-center gap-10">
          <div className="flex gap-3 items-center">
            <img className="w-6 hidden sm:block" src="./letter-c.png" alt="" />
            <h3 className="text-2xl sm:block hidden">
              Complaint Management System
            </h3>
          </div>
          <div className="relative">
            <button
              onClick={() => setPopupOpen(!popupOpen)}
              className="flex items-center focus:outline-none"
            >
              <img
                className="sm:w-10 sm:h-10 h-7 w-7 rounded-full"
                src="https://tse4.mm.bing.net/th?id=OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH&pid=Api&P=0&h=180"
              />
            </button>
            <div
              className={`${
                popupOpen ? "block" : "hidden"
              } absolute z-10 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-700`}
            >
              {role === "user" && (
                <Link
                  to="/my-profile"
                  className="block cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  My Profile
                </Link>
              )}
              <Link
                to={
                  role === "admin"
                    ? "/admin-change-password"
                    : "/change-password"
                }
                className="block cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                Change Password
              </Link>
              <div
                onClick={role === "admin" ? adminLogoutHandler : logoutHandler}
                className="block cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
