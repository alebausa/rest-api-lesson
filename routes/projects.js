const router = require('express').Router();
const Project = require('../models/Project');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Get all projects
// @route   GET /api/v1/projects/
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({});
    if (!projects) {
      next(new ErrorResponse('No projects found', 404));
    }
    res.status(200).json({ data: projects })
  } catch (error) {
    next(error);
  }
});

// @desc    Get single project
// @route   GET /api/v1/projects/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      next(new ErrorResponse(`Project not found by id: ${id}`, 404));
    }
    res.status(200).json({ data: project })
  } catch (error) {
    next(error);
  }
});

// @desc    Create a project
// @route   POST /api/v1/projects
// @access  Public
router.post('/', async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const project = await Project.create({ title, description });
    if (!project) {
      next(new ErrorResponse('An error ocurred while creating the project', 500));
    }
    res.status(201).json({ data: project })
  } catch (error) {
    next(error);
  }
});

// @desc    Edit a project
// @route   PUT /api/v1/projects/:id
// @access  Public
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const project = await Project.findById(id);
    if (!project) {
      next(new ErrorResponse(`Project not found by id: ${id}`, 404));
    } else {
      const updatedProject = await Project.findByIdAndUpdate(id, { title, description }, { new: true });
      res.status(202).json({ data: updatedProject })
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a project
// @route   DELETE /api/v1/projects/:id
// @access  Public
router.delete('/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      next(new ErrorResponse(`Project not found by id: ${id}`, 404));
    } else {
      const deleted = await Project.findByIdAndDelete(id);
      res.status(202).json({ data: deleted });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
