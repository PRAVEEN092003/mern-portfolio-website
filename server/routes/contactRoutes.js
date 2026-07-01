const express   = require('express');
const router    = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  createContact,
  getAllContacts,
  markAsRead,
  deleteContact,
} = require('../controllers/contactController');

// ─── Public Routes ────────────────────────────────────────────────────────────
router.post('/', createContact); // POST /api/contacts  ← portfolio contact form

// ─── Admin Routes (require x-admin-key header) ────────────────────────────────
router.get('/',              adminAuth, getAllContacts); // GET    /api/contacts
router.put('/:id/read',      adminAuth, markAsRead);    // PUT    /api/contacts/:id/read
router.delete('/:id',        adminAuth, deleteContact); // DELETE /api/contacts/:id

module.exports = router;
