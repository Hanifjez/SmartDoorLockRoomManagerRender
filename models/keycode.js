const mongoose = require("mongoose");

const KeyCodeSchema = new mongoose.Schema(
  {
    keyCode: {
      type: String,
      unique: true,
      required: true
    },
    active: {
      type: Boolean,
      default: true // Menetapkan status aktif secara default
    },
    description: {
      type: String,
      required: true,
      maxlength: 200 // Batas maksimum karakter, dapat disesuaikan
    }
  },
  { timestamps: true }
);

// Hilangkan indeks tambahan jika tidak diperlukan
// KeyCodeSchema.index({keyCode: 1}, {unique: true});

module.exports = mongoose.model("KeyCode", KeyCodeSchema);
