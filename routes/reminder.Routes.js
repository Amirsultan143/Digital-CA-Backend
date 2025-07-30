const express = require("express");
const router = express.Router();
const {
  createReminder,
  getReminders,
  deleteReminder
} = require("../controllers/reminder.Controller");
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const reminderSchema = require('../validators/reminder.validator');

router.post("/", protect, validate(reminderSchema), createReminder);       // Only CA
router.get("/", protect, getReminders);          // CA or Client
router.delete("/:id", protect, deleteReminder);  // Only CA

module.exports = router;
