const express = require("express");
const router = express.Router();
const {
  createSleepEntry,
  getSleepEntries
} = require("../controllers/sleepController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, createSleepEntry)
  .get(protect, getSleepEntries)

module.exports = router;
