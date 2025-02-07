const mongoose = require("mongoose");

async function removeUniqueIndex() {
  try {
    const db = mongoose.connection;
    await db.collection("subcategories").dropIndex("categoryId_1"); // Remove unique index
    console.log("Unique index on categoryId removed successfully!");
  } catch (error) {
    console.log("No unique index found or already removed.");
  }
}

removeUniqueIndex(); // Run this function on startup

const subCategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category", // Ensure this matches your main category collection
      required: true, // ✅ This ensures categoryId is always provided
    },
    subCategory: {
      type: String,
      required: true,
      unique: true, // ✅ Only subCategory should be unique
      trim: true,
    },
  },
  { timestamps: true }
);

const subCategoryModel = mongoose.model("subCategory", subCategorySchema);
module.exports = subCategoryModel;
