// Import our keyCode schema
const KeyCodeModel = require("../models/keycode");

module.exports = {
  // Callback function to create our new key code
  createNewKeyCode: async function (keyCode, active, description) {
    try {
      const existingRecord = await KeyCodeModel.findOne({ keyCode: keyCode });
      // Key code is not in the database
      if (!existingRecord) {
        const newKeyCode = new KeyCodeModel({
          keyCode: keyCode,
          active: active,
          description: description,
        });
        const savedKeyCode = await newKeyCode.save();
        return {
          success: true,
          message: "Successfully created new key code records",
          keyCode: savedKeyCode
        };
      } else {
        return {
          success: false,
          message: `${keyCode} already exists in database`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Unable to create new key code!",
      };
    }
  },

  // Get specific Key Code record
  getKeyCode: async function (keyCode) {
    try {
      const record = await KeyCodeModel.findOne({ keyCode: keyCode, active: true });
      if (!record) {
        return { success: false, message: "Unable to find keycode record!" };
      }
      return {
        success: true,
        message: "Successfully retrieved keycode record",
        keyCode: record,
      };
    } catch (error) {
      return { success: false, message: "Server error while retrieving keycode" };
    }
  },

  // Get all key codes records
  getAllKeyCodes: async function () {
    try {
      const keyCodes = await KeyCodeModel.find({});
      return {
        success: true,
        message: "Successfully retrieved keycode records",
        keyCodes: keyCodes,
      };
    } catch (error) {
      return { success: false, message: "Unable to find keycode records!" };
    }
  },

  // Update key code record
  updateKeyCodeRecord: async function (keyCode, active, description) {
    try {
      const record = await KeyCodeModel.findOne({ keyCode: keyCode });
      if (!record) {
        return {
          success: false,
          message: "Keycode record not found while updating!",
        };
      }
      record.active = active;
      record.description = description;

      const updatedRecord = await record.save();
      return {
        success: true,
        message: "Successfully updated record!",
        keyCode: updatedRecord,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update keycode record!",
      };
    }
  },

  // Delete key code record
  deleteKeyCodeRecord: async function (keyCode) {
    try {
      const result = await KeyCodeModel.findOneAndDelete({ keyCode: keyCode });
      if (!result) {
        return {
          success: false,
          message: "Keycode record not found while deleting!",
        };
      }
      return {
        success: true,
        message: "Successfully deleted keycode record!",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete keycode record!",
      };
    }
  },

  // Delete all inactive key codes
  deleteInactiveKeyCodes: async function () {
    try {
      const result = await KeyCodeModel.deleteMany({ active: false });
      return {
        success: true,
        message: "Successfully deleted all inactive keycodes",
        deletedCount: result.deletedCount,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete inactive keycodes",
      };
    }
  }
};
