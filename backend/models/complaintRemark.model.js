const mongoose = require("mongoose");


const complaintRemarkSchema = new mongoose.Schema(
  {
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "complaint",
      required: true,
    },
    remark: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const complaintRemarkModel = mongoose.model(
  "complaintremark",
  complaintRemarkSchema
);

module.exports = complaintRemarkModel;
