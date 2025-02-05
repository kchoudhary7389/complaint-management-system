import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import AdminLogin from "./pages/AdminLogin";
import "remixicon/fonts/remixicon.css";
import Home from "./pages/Home";
import UserProtected from "./pages/UserProtected";
import AdminProtected from "./pages/AdminProtected";
import AdminHome from "./pages/AdminHome";
import UserLogout from "./pages/UserLogout";
import LodgeComplaint from "./pages/LodgeComplaint";
import ComplaintHistory from "./pages/ComplaintHistory";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import "remixicon/fonts/remixicon.css";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminChangePassword from "./pages/AdminChangePassword";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import AddSubCategory from "./pages/AddSubCategory";
import EditSubCategory from "./pages/EditSubCategory";
import AddState from "./pages/AddState";
import EditState from "./pages/EditState";
import ManageUsers from "./pages/ManageUsers";
import ComplaintDetails from "./pages/ComplaintDetails";
import AllComplaints from "./pages/AllComplaints";
import AdminComplaintDetails from "./pages/AdminComplaintDetails";
import NotProcessYet from "./pages/NotProcessYet";
import InProcessComplaints from "./pages/InProcessComplaints";
import ClosedComplaints from "./pages/ClosedComplaints";
import UserComplaints from "./pages/UserComplaints";
import MyProfile from "./pages/MyProfile";
import UpdateProfile from "./pages/UpdateProfile";
import AdminUserDetails from "./pages/AdminUserDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/registration" element={<UserSignup />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
      <Route
        path="/home"
        element={
          <UserProtected>
            <Home />
          </UserProtected>
        }
      />
      <Route
        path="/admin-home"
        element={
          <AdminProtected>
            <AdminHome />
          </AdminProtected>
        }
      />
      <Route
        path="/lodge-complaint"
        element={
          <UserProtected>
            <LodgeComplaint />
          </UserProtected>
        }
      />
      <Route
        path="/complaint-history"
        element={
          <UserProtected>
            <ComplaintHistory />
          </UserProtected>
        }
      />
      <Route
        path="/complaint-details/:id"
        element={
          <UserProtected>
            <ComplaintDetails />
          </UserProtected>
        }
      />
      <Route
        path="/change-password"
        element={
          <UserProtected>
            <ChangePassword />
          </UserProtected>
        }
      />
      <Route
        path="/my-profile"
        element={
          <UserProtected>
            <MyProfile />
          </UserProtected>
        }
      />
      <Route
        path="/update-profile"
        element={
          <UserProtected>
            <UpdateProfile />
          </UserProtected>
        }
      />
      <Route
        path="/admin-change-password"
        element={
          <AdminProtected>
            <AdminChangePassword />
          </AdminProtected>
        }
      />
      <Route
        path="/add-category"
        element={
          <AdminProtected>
            <AddCategory />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/edit-category/:id"
        element={
          <AdminProtected>
            <EditCategory />
          </AdminProtected>
        }
      />
      <Route
        path="/add-subCategory/"
        element={
          <AdminProtected>
            <AddSubCategory />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/edit-subCategory/:id"
        element={
          <AdminProtected>
            <EditSubCategory />
          </AdminProtected>
        }
      />
      <Route
        path="/add-state/"
        element={
          <AdminProtected>
            <AddState />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/edit-state/:id"
        element={
          <AdminProtected>
            <EditState />
          </AdminProtected>
        }
      />
      <Route
        path="/manage-users"
        element={
          <AdminProtected>
            <ManageUsers />
          </AdminProtected>
        }
      />
      <Route
        path="/all-complaints"
        element={
          <AdminProtected>
            <AllComplaints />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/complaint-details/:id"
        element={
          <AdminProtected>
            <AdminComplaintDetails />
          </AdminProtected>
        }
      />
      <Route
        path="/not-process-yet"
        element={
          <AdminProtected>
            <NotProcessYet />
          </AdminProtected>
        }
      />
      <Route
        path="/in-process"
        element={
          <AdminProtected>
            <InProcessComplaints />
          </AdminProtected>
        }
      />
      <Route
        path="/closed-complaints"
        element={
          <AdminProtected>
            <ClosedComplaints />
          </AdminProtected>
        }
      />
      <Route
        path="/manage-users/complaints/:id"
        element={
          <AdminProtected>
            <UserComplaints />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/user-details/:id"
        element={
          <AdminProtected>
            <AdminUserDetails />
          </AdminProtected>
        }
      />
    </Routes>
  );
}

export default App;
