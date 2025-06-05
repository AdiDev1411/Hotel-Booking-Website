const express = require('express');
const router = express.Router();
const Contact = require('../models/Contacts');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, number, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      number,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact info submitted successfully." });
  } catch (err) {
    console.error("Error saving contact info:", err);
    res.status(500).json({ message: "Failed to submit contact info." });
  }
});

// GET all contact messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ _id: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

// DELETE /api/contacts/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
