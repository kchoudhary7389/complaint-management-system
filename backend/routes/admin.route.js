const Router = require("express");
const { body } = require("express-validator");
const {
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
  forgotPassword,
  adminChangePassword,
  getAllUsers,
  deleteUser,
  registerAdmin,
} = require("../controllers/admin.controller");
const {
  addCategory,
  editCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
} = require("../controllers/category.controller");

const {
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  getSubcategoryByCategory,
} = require("../controllers/subCategory.controller");
const { authAdmin } = require("../middlewares/auth.middleware");
const {
  addState,
  editState,
  deleteState,
  getAllState,
  getStateById,
} = require("../controllers/state.controller");
const {
  getAllComplaints,
  getComplaintDetails,
  remarkComplaint,
  notProcessComplaints,
  inProcessComplaints,
  closedComplaints,
  getComplaintsByUserId,
} = require("../controllers/complaint.controller");
const { getUserProfileByid } = require("../controllers/user.controller");

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerAdmin
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginAdmin
);

router.get("/profile", authAdmin, getAdminProfile);
router.get("/userProfile/:id", authAdmin, getUserProfileByid);
router.get("/logout", authAdmin, logoutAdmin);
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
  authAdmin,
  adminChangePassword
);
router.post(
  "/add-category",
  [body("category").notEmpty().withMessage("Please enter Category Name")],
  authAdmin,
  addCategory
);
router.put(
  "/edit-category/:id",
  [body("category").notEmpty().withMessage("Please enter Category Name")],
  authAdmin,
  editCategory
);
router.delete("/delete-category/:id", authAdmin, deleteCategory);
router.get("/get-all-category", authAdmin, getAllCategory);
router.get("/category/:id", authAdmin, getCategoryById);

router.post(
  "/add-SubCategory",
  [body("subCategory").notEmpty().withMessage("Please enter SubCategory")],
  authAdmin,
  addSubCategory
);

router.put(
  "/edit-SubCategory/:id",
  [body("subCategory").notEmpty().withMessage("Please enter SubCategory")],
  authAdmin,
  editSubCategory
);

router.delete("/delete-subCategory/:id", authAdmin, deleteSubCategory);
router.get("/get-all-subCategory", authAdmin, getAllSubCategory);
router.get("/subCategory/:id", authAdmin, getSubCategoryById);

router.post(
  "/add-state",
  [body("state").notEmpty().withMessage("Please enter State Name")],
  authAdmin,
  addState
);

router.put(
  "/edit-state/:id",
  [body("state").notEmpty().withMessage("Please enter State Name")],
  authAdmin,
  editState
);
router.delete("/delete-state/:id", authAdmin, deleteState);
router.get("/get-all-state", authAdmin, getAllState);
router.get("/state/:id", authAdmin, getStateById);

router.get("/get-all-users", authAdmin, getAllUsers);
router.delete("/delete-user/:id", authAdmin, deleteUser);

router.get("/get-all-complaints", authAdmin, getAllComplaints);
router.get("/not-process-complaints", authAdmin, notProcessComplaints);
router.get("/in-process-complaints", authAdmin, inProcessComplaints);
router.get("/closed-complaints", authAdmin, closedComplaints);
router.get("/complaint-details/:id", authAdmin, getComplaintDetails);
router.post(
  "/update-complaint/:id",
  [
    body("status").notEmpty().withMessage("Please enter Status Name"),
    body("remark").notEmpty().withMessage("Please enter Remark"),
  ],
  authAdmin,
  remarkComplaint
);
router.get("/get-complaints/:id", authAdmin, getComplaintsByUserId);

module.exports = router;
