const mongoose = require("mongoose");
const subCategoryModel = require("../models/subCategory.model");
const { validationResult } = require("express-validator");

const addSubCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { subCategory, categoryId } = req.body;

    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory Name is required" });
    }

    const existingSubCategory = await subCategoryModel.findOne({
      subCategory,
    });
    if (existingSubCategory) {
      return res.status(400).json({ message: "SubCategory already exists" });
    }

    const newSubCategory = await subCategoryModel.create({
      subCategory,
      categoryId,
    });

    return res
      .status(200)
      .json({ message: "SubCategory created successfully", newSubCategory });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const editSubCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { id } = req.params;
    const { subCategory } = req.body;

    const existingSubCategory = await subCategoryModel.findById(id);
    if (!existingSubCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    const duplicateSubCategory = await subCategoryModel.findOne({
      subCategory,
    });

    if (duplicateSubCategory && duplicateSubCategory._id.toString() !== id) {
      return res.status(404).json({ message: "Category already exists" });
    }

    existingSubCategory.subCategory = subCategory;
    await existingSubCategory.save();

    return res.status(200).json({
      message: "SubCategory Updated successfully",
      subCategory: existingSubCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingSubCategory = await subCategoryModel.findById(id);
    if (!existingSubCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    await subCategoryModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "SubCategory Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const getAllSubCategory = async (req, res) => {
  try {
    const subCategories = await subCategoryModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ subCategories: subCategories });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};
const getSubcategoryByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log(categoryId);

    const subCategories = await subCategoryModel.find({ categoryId });

    if (!subCategories.length) {
      return res.status(404).json({ message: "No Subcategory found" });
    }

    return res.status(200).json({ subCategories });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await subCategoryModel.findById(id);
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    return res.status(200).json({ subCategory });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

module.exports = {
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
  getAllSubCategory,
  getSubcategoryByCategory,
  getSubCategoryById,
};
