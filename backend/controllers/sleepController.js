const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Sleep = require("../models/sleepModel");

// helper
const removeTime = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// @desc Create new sleep entry
// @route POST /api/sleep
// @access Private
const createSleepEntry = asyncHandler(async (req, res) => {
  const { sleepTime, wakeUpTime, date } = req.body;

  if (!sleepTime || !wakeUpTime || !date) {
    res.status(400);
    throw new Error("Invalid input.");
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  // transform date -> time will be removed (only the date is required);

  const transformed_date = removeTime(new Date(date));

  // check if entry for that date already exists
  const sleep = await Sleep.find({ user: req.user.id, date: transformed_date });

  if (sleep.length > 0) {
    res.status(412);
    throw new Error("There is already a sleep entry for that date!");
  }

  const new_sleep = await Sleep.create({
    sleepTime,
    wakeUpTime,
    date: transformed_date,
    user: req.user.id,
  });

  res.status(201).json(new_sleep);
});

// @desc get all sleep entries for a user
// @route GET /api/sleep
// optional params: daysBack (how many sleep entries in days back since today)
// @access Private
const getSleepEntries = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  // check if param is given
  const daysBack = parseInt(req.query.daysBack || 7);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  // calculate date subtracted with daysBack
  const startFilterDate = new Date().setDate(new Date().getDate() - daysBack);

  const sleepEntries = await Sleep.find({
    user: req.user.id,
    date: { $gte: startFilterDate, $lt: new Date() },
  }).sort({
    date: -1,
  });

  res.status(200).json(sleepEntries);
});

module.exports = {
  createSleepEntry,
  getSleepEntries,
};
