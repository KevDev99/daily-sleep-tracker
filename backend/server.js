const dotenv = require("dotenv").config();
const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const path = require('path');

const PORT = process.env.PORT || 5000;

// connect to DB
connectDB();

const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/sleep", require("./routes/sleepRoutes"));

// error handler middleware
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../", "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Daily-Sleep-Tracker Backend API" });
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
