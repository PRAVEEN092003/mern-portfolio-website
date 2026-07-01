const Project = require('../models/Project');

// ─── GET /api/projects ───────────────────────────────────────────────────────
// Public — returns all projects sorted by order then newest first
const getAllProjects = async (req, res, next) => {
  try {
    const { featured } = req.query;
    const filter = {};
    if (featured === 'true') filter.featured = true;

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/projects/:id ───────────────────────────────────────────────────
// Public — returns a single project by ID
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      const err = new Error('Project not found');
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/projects ──────────────────────────────────────────────────────
// Admin — creates a new project
const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    // Mongoose validation error
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
      error.message = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
    }
    next(error);
  }
};

// ─── PUT /api/projects/:id ───────────────────────────────────────────────────
// Admin — updates an existing project
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,          // return the updated document
      runValidators: true,
    });
    if (!project) {
      const err = new Error('Project not found');
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, data: project });
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

// ─── DELETE /api/projects/:id ────────────────────────────────────────────────
// Admin — deletes a project
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      const err = new Error('Project not found');
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
