const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const stateModel = mongoose.model("state", stateSchema);
module.exports = stateModel;
