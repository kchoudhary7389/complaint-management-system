import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout, adminLogout } from "../utils/logout";
import { useAuthRole } from "../utils/authRole";

function Sidebar() {
  const logoutHandler = logout();
  const adminLogoutHandler = adminLogout();
  const { role } = useAuthRole();
  const [isOpen, setIsOpen] = useState(false);
  const userLinks = [
    { name: "Dashboard", path: "/home" },
    { name: "Lodge Complaint", path: "/lodge-complaint" },
    { name: "Complaint History", path: "/complaint-history" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin-home" },
    { name: "Add Category", path: "/add-category" },
    { name: "Add SubCategory", path: "/add-subCategory" },
    { name: "Add State", path: "/add-state" },
    { name: "Manage Users", path: "/manage-users" },
    { name: "All Complaints", path: "/all-complaints" },
    { name: "Not Process Yet", path: "/not-process-yet" },
    { name: "In Process", path: "/in-process" },
    { name: "Closed Complaints", path: "/closed-complaints" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;
  return (
    <div className="font-['ubuntu']">
      <header className="bg-gray-900 w-full text-gray-100 p-3 z-30 px-6 flex items-center justify-between">
        <div className="flex items-center justify-between">
          <img className="w-6" src="./letter-c.png" alt="" />
          <h1 className="text-base font-bold ml-2">CMS</h1>
        </div>
        <button className="text-white sm:hidden block" onClick={() => {
          setIsOpen(!isOpen)
        }}>
          <i className="ri-menu-line text-xl"></i>
        </button>
      </header>
      <div
        id="sidebar"
        className={`sidebar  duration:200 sm:block mt-20 sm:mt-0 absolute z-20 lg:relative left-0 top-0 sm:min-h-screen min-h-screen sm:w-[250px] w-full bg-gray-900 text-center transition-transform transform  lg:translate-x-0 -translate-y-[115%] sm:-translate-y-0 ${isOpen  ? "translate-y-0" :"-translate-y-[115%]"}`}
      >
        <div className="text-gray-100 text-sm">
          <div className="p-1 flex items-center justify-between"></div>
          <div className="my-1 bg-gray-600 h-[1px]"></div>
        </div>

        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-600" : ""
              } p-2 mt-1 flex items-center rounded-md px-3 duration-300 cursor-pointer hover:bg-blue-600 text-white`
            }
          >
            <i className="bi bi-house-door-fill"></i>
            <span className="text-sm ml-2 text-gray-200 font-bold">
              {link.name}
            </span>
          </NavLink>
        ))}
        <div className="my-1 bg-gray-600 h-[.5px]"></div>

        <div
          onClick={role === "admin" ? adminLogoutHandler : logoutHandler}
          className="p-2 mt-1 flex items-center rounded-md px-3 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <i className="bi bi-people-fill"></i>
          <span className="text-sm ml-2 text-gray-200 font-bold">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
