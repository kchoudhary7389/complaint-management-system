const Router = require("express");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  forgotPassword,
  changePassword,
  updateUserProfile,
} = require("../controllers/user.controller");
const { authUser } = require("../middlewares/auth.middleware");
const {
  createComplaint,
  getComplaintHistory,
  deleteComplaint,
  getComplaintDetails,
} = require("../controllers/complaint.controller");
const {
  getSubcategoryByCategory,
} = require("../controllers/subCategory.controller");

const router = Router();

router.post(
  "/register",
  [
    body("fullname")
      .isLength({ min: 3 })
      .withMessage("fullname must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Invalid Email or Password"),
  ],
  loginUser
);

router.get("/profile", authUser, getUserProfile);
router.get("/logout", authUser, logoutUser);
router.post(
  "/forgot-password",
  [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("contactno")
      .isLength({ min: 10 })
      .withMessage("Invalid Contact Number"),
  ],
  forgotPassword
);
router.post(
  "/change-password",
  [
    body("currentPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  authUser,
  changePassword
);

router.post(
  "/lodge-complaint",
  [
    body("category").notEmpty().withMessage("Category is required"),
    body("subCategory").notEmpty().withMessage("Sub-category is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("natureOfComplaint")
      .notEmpty()
      .withMessage("Complaint Nature is required"),
    body("complaintDetail")
      .notEmpty()
      .withMessage("Complaint detail is required"),
  ],
  authUser,
  createComplaint
);

router.post(
  "/update-profile",
  [
    body("fullname").notEmpty().withMessage("Fullname is required"),
    body("contactno")
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage("Invalid Contact Number"),
  ],
  authUser,
  updateUserProfile
);

router.get("/complaint-history", authUser, getComplaintHistory);
router.get("/complaint-details/:id", authUser, getComplaintDetails);
router.delete("/delete-complaint/:id", authUser, deleteComplaint);
router.get("/get-subCategory/:categoryId", authUser, getSubcategoryByCategory);

module.exports = router;
