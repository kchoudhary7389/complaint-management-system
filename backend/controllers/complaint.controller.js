const complaintModel = require("../models/complaint.model");
const { validationResult } = require("express-validator");
const complaintRemarkModel = require("../models/complaintRemark.model");

const createComplaint = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array()[0].msg });
  }

  const {
    userId,
    subCategory,
    category,
    complaintType,
    state,
    natureOfComplaint,
    complaintDetail,
  } = req.body;

  if (
    !userId ||
    !category ||
    !subCategory ||
    !complaintType ||
    !natureOfComplaint ||
    !complaintDetail ||
    !state
  ) {
    return res.status(404).json({ message: "All fields are required" });
  }

  const complaint = await complaintModel.create({
    userId,
    category,
    subCategory,
    complaintType,
    natureOfComplaint,
    complaintDetail,
    state,
  });
  return res
    .status(200)
    .json({ message: "Complaint Submitted successfully", complaint });
};

const getComplaintHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const complaints = await complaintModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "fullname email")
      .populate("category", "category");
    return res.status(200).json({ complaints });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Somthing went wrong" });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const existingComplaint = await complaintModel.findById(id);
    if (!existingComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    await complaintModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Complaint Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const getComplaintDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const complaintDetails = await complaintModel
      .findById(id)
      .populate("userId", "fullname email")
      .populate("category");
    const remark = await complaintRemarkModel.find({ complaintId: id });

    if (!complaintDetails) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    return res.status(200).json({ complaintDetails, remark });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Somthing went wrong" });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintModel
      .find()
      .sort({ createdAt: -1 })
      .populate("userId", "fullname email");

    return res.status(200).json({ complaints });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Somthing went wrong" });
  }
};

const remarkComplaint = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array()[0].msg });
  }

  const { complaintId, status, remark } = req.body;
  try {
    const remarkComplaint = await complaintRemarkModel.create({
      complaintId,
      status,
      remark,
    });

    await complaintModel.findByIdAndUpdate(complaintId, { status });

    return res.status(200).json({ message: "Remark added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Somthing went wrong" });
  }
};

const notProcessComplaints = async (req, res) => {
  try {
    const complaints = await complaintModel
      .find({ status: "Not processed yet" })
      .sort({ createdAt: -1 })
      .populate("userId", "fullname email");

    return res.status(200).json({ complaints });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Somthing went wrong" });
  }
};

const inProcessComplaints = async (req, res) => {
  try {
    const complaints = await complaintModel
      .find({ status: "In process" })
      .populate("userId", "fullname email");

    if (!complaints) {
      return res.status(404).json({ message: "Complaints not found" });
    }

    return res.status(200).json({ complaints });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Somthing went wrong" });
  }
};

const closedComplaints = async (req, res) => {
  try {
    const complaints = await complaintModel
      .find({ status: "Closed" })
      .populate("userId", "fullname email");

    if (!complaints) {
      return res.status(404).json({ message: "Complaints not found" });
    }

    return res.status(200).json({ complaints });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Somthing went wrong" });
  }
};

const getComplaintsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const complaints = await complaintModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "fullname email");

    if (!complaints) {
      return res.status(404).json({ message: "Complaints not found" });
    }

    return res.status(200).json({ complaints });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Somthing went wrong" });
  }
};

module.exports = {
  createComplaint,
  getComplaintHistory,
  deleteComplaint,
  getComplaintDetails,
  getAllComplaints,
  remarkComplaint,
  notProcessComplaints,
  inProcessComplaints,
  closedComplaints,
  getComplaintsByUserId,
};
