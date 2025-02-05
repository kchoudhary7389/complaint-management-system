const { validationResult } = require("express-validator");
const categoryModel = require("../models/category.model");

const addCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { category } = req.body;

    if (!category) {
      return res.status(404).json({ message: "Category Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = await categoryModel.create({ category });

    return res
      .status(200)
      .json({ message: "Category created successfully", newCategory });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const editCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { id } = req.params;
    const { category } = req.body;

    const existingCategory = await categoryModel.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const duplicateCategory = await categoryModel.findOne({ category });

    if (duplicateCategory && duplicateCategory._id.toString() !== id) {
      return res.status(404).json({ message: "Category already exists" });
    }

    existingCategory.category = category;
    await existingCategory.save();

    return res.status(200).json({
      message: "Category Updated successfully",
      category: existingCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategory = await categoryModel.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    await categoryModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Category Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ categories: categories });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    console.log(category)
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
};
