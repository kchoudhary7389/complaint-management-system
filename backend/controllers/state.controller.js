const stateModel = require("../models/state.model");
const { validationResult } = require("express-validator");

const addState = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { state } = req.body;

    if (!state) {
      return res.status(404).json({ message: "State Name is required" });
    }

    const existingState = await stateModel.findOne({ state });
    if (existingState) {
      return res.status(400).json({ message: "State already exists" });
    }

    const newState = await stateModel.create({ state });

    return res
      .status(200)
      .json({ message: "State created successfully", newState });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const editState = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { id } = req.params;
    const { state } = req.body;

    const existingState = await stateModel.findById(id);
    if (!existingState) {
      return res.status(404).json({ message: "State not found" });
    }

    const duplicateState = await stateModel.findOne({ state });

    if (duplicateState && duplicateState._id.toString() !== id) {
      return res.status(404).json({ message: "State already exists" });
    }

    existingState.state = state;
    await existingState.save();

    return res.status(200).json({
      message: "State Updated successfully",
      state: existingState,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const deleteState = async (req, res) => {
  try {
    const { id } = req.params;

    const existingState = await stateModel.findById(id);
    if (!existingState) {
      return res.status(404).json({ message: "State not found" });
    }

    await stateModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "State Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const getAllState = async (req, res) => {
  try {
    const states = await stateModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ states: states });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

const getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await stateModel.findById(id);
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    return res.status(200).json({ state });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "something went wrong" });
  }
};

module.exports = {
  addState,
  editState,
  deleteState,
  getAllState,
  getStateById,
};
