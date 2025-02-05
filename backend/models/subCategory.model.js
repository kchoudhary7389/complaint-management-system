const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    subCategory: {
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

const subCategoryModel = mongoose.model("subCategory", subCategorySchema);
module.exports = subCategoryModel;
