const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    complaintType: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    natureOfComplaint: {
      type: String,
      required: true,
    },
    complaintDetail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Not processed yet",
    },
  },
  { timestamps: true }
);

const complaintModel = mongoose.model("complaint", complaintSchema);

module.exports = complaintModel;
