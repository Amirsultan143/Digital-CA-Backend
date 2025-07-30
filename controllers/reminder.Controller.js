const Reminder = require("../models/Reminder");

// POST /api/reminders => Create reminder (CA only)
exports.createReminder = async (req, res) => {
  try {
    if (req.user.role !== "ca") {
      return res.status(403).json({ message: "Only CA can create reminders" });
    }

    const { clientId, title, description, dueDate } = req.body;

    const newReminder = await Reminder.create({
      clientId,
      caId: req.user._id,
      title,
      description,
      dueDate
    });

    res.status(201).json(newReminder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create reminder", error });
  }
};

// GET /api/reminders => Get all reminders (CA or Client)
exports.getReminders = async (req, res) => {
  try {
    let reminders;

    if (req.user.role === "ca") {
      reminders = await Reminder.find({ caId: req.user._id }).populate("clientId", "name email");
    } else {
      reminders = await Reminder.find({ clientId: req.user._id }).populate("caId", "name email");
    }

    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reminders", error });
  }
};

// DELETE /api/reminders/:id => Delete reminder (CA only)
exports.deleteReminder = async (req, res) => {
  try {
    if (req.user.role !== "ca") {
      return res.status(403).json({ message: "Only CA can delete reminders" });
    }

    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    if (reminder.caId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this reminder" });
    }

    await reminder.deleteOne();
    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete reminder", error });
  }
};
