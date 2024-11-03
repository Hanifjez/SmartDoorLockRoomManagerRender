const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

// Setup dotenv
dotenv.config();

// Middleware functions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup mongoose
const mongodbConnString = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME_CONN}/${process.env.DB_NAME}`;
mongoose.connect(mongodbConnString);

mongoose.connection.on("error", function (error) {
    console.log(error);
});

mongoose.connection.on("open", function () {
    console.log("Successfully connected to MongoDB Atlas database.");
});

// Middleware function for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk menangani permintaan ke /
app.get("/", (req, res) => {
    res.send("Welcome to the Smart Door Lock API!");
});

// API Routes
app.use(require("./routes/keycodes/keycode"));

// Start server
app.listen(PORT, function () {
    console.log(`Server app listening on port ${PORT}`);
});
