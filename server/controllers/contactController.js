const Contact = require('../models/Contact');

// ─── POST /api/contacts ──────────────────────────────────────────────────────
// Public — saves a new contact message from the portfolio form
const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic presence check (Mongoose validators will do the rest)
    if (!name || !email || !subject || !message) {
      const err = new Error('All fields (name, email, subject, message) are required');
      err.statusCode = 400;
      return next(err);
    }

    const contact = await Contact.create({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon. 🙌",
      data: { id: contact._id, createdAt: contact.createdAt },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
      error.message = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
    }
    next(error);
  }
};

// ─── GET /api/contacts ───────────────────────────────────────────────────────
// Admin — returns all contact messages, newest first
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/contacts/:id/read ──────────────────────────────────────────────
// Admin — marks a message as read
const markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) {
      const err = new Error('Message not found');
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/contacts/:id ────────────────────────────────────────────────
// Admin — deletes a contact message
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      const err = new Error('Message not found');
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
  getAllContacts,
  markAsRead,
  deleteContact,
};
