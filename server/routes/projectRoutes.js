const express  = require('express');
const router   = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// ─── Public Routes ────────────────────────────────────────────────────────────
router.get('/',    getAllProjects);   // GET  /api/projects?featured=true
router.get('/:id', getProjectById);  // GET  /api/projects/:id

// ─── Admin Routes (require x-admin-key header) ────────────────────────────────
router.post('/',    adminAuth, createProject);   // POST   /api/projects
router.put('/:id',  adminAuth, updateProject);   // PUT    /api/projects/:id
router.delete('/:id', adminAuth, deleteProject); // DELETE /api/projects/:id

module.exports = router;
