const express = require("express");
const router = express.Router();
const keyCodeController = require("../../controllers/keycode");

// Test API
router.get("/api", (req, res) => {
  res.send("hello REST API");
});

// Get specific Key Code record in the database
router.get("/api/keycodes/:keyCode", async (req, res) => {
  try {
    const keyCode = req.params.keyCode;
    const result = await keyCodeController.getKeyCode(keyCode);
    if (!result) {
      return res.status(404).json({ error: true, message: "Keycode not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "Server error" });
  }
});

// Get all key codes records in the database
router.get("/api/keycodes", async (req, res) => {
  try {
    const result = await keyCodeController.getAllKeyCodes();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: true, message: "Server error" });
  }
});

// New Key Code Route
router.post("/api/keycodes/newKeyCode", async (req, res) => {
  const { keyCode, active, description } = req.body;
  if (!keyCode || typeof active !== "boolean" || !description) {
    return res.status(400).json({ error: true, message: "keyCode, active, and description are required" });
  }
  try {
    const result = await keyCodeController.createNewKeyCode(keyCode, active, description);
    res.status(201).json({ message: "Keycode added successfully", data: result });
  } catch (error) {
    res.status(500).json({ error: true, message: "Failed to create keycode" });
  }
});

// Update key code record
router.put("/api/keycodes/:keyCode", async (req, res) => {
  const keyCode = req.params.keyCode;
  const { active, description } = req.body;

  if (typeof active !== "boolean" || !description) {
    return res.status(400).json({ error: true, message: "Active status and description are required" });
  }

  try {
    const result = await keyCodeController.updateKeyCodeRecord(keyCode, active, description);
    if (!result) {
      return res.status(404).json({ error: true, message: "Keycode not found" });
    }
    res.json({ message: "Keycode updated successfully", data: result });
  } catch (error) {
    res.status(500).json({ error: true, message: "Failed to update keycode" });
  }
});

// Delete specific key code record
router.delete("/api/keycodes/:keyCode", async (req, res) => {
  const keyCode = req.params.keyCode;
  if (!keyCode) {
    return res.status(400).json({ error: true, message: "keyCode is required" });
  }

  try {
    const result = await keyCodeController.deleteKeyCodeRecord(keyCode);
    if (!result) {
      return res.status(404).json({ error: true, message: "Keycode not found" });
    }
    res.json({ message: "Keycode deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Failed to delete keycode" });
  }
});

// Delete all inactive key codes
router.delete("/api/keycodes", async (req, res) => {
  try {
    const result = await keyCodeController.deleteInactiveKeyCodes();
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: true, message: "No inactive keycodes found" });
    }
    res.json({ message: "Successfully deleted all inactive keycodes", deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: true, message: "Failed to delete inactive keycodes" });
  }
});

module.exports = router;
