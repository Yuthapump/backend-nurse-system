// controller.js
const ShiftService = require("./service");

exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await ShiftService.getAllShifts();
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving shifts", error });
  }
};

exports.getShiftById = async (req, res) => {
  const { id } = req.params;
  try {
    const shift = await ShiftService.getShiftById(id);
    if (!shift) {
      return res.status(404).json({ message: "Shift not found" });
    }
    res.status(200).json(shift);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving shift", error });
  }
};

exports.createShift = async (req, res) => {
  const shiftData = req.body;
  console.log("Creating shift with data:", shiftData);
  if (
    !shiftData ||
    !shiftData.date ||
    !shiftData.start_time ||
    !shiftData.end_time
  ) {
    return res.status(400).json({ message: "Invalid shift data" });
  }
  try {
    const newShift = await ShiftService.createShift(shiftData);
    res.status(201).json(newShift);
  } catch (error) {
    res.status(500).json({ message: "Error creating shift", error });
  }
};

exports.updateShift = async (req, res) => {
  const { id } = req.params;
  const shiftData = req.body;
  try {
    const updatedShift = await ShiftService.updateShift(id, shiftData);
    if (!updatedShift) {
      return res.status(404).json({ message: "Shift not found" });
    }
    res.status(200).json(updatedShift);
  } catch (error) {
    res.status(500).json({ message: "Error updating shift", error });
  }
};

exports.deleteShift = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedShift = await ShiftService.deleteShift(id);
    if (!deletedShift) {
      return res.status(404).json({ message: "Shift not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting shift", error });
  }
};
