const router = require('express').Router();
const Project = require('../models/Project');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt');
const fileUploader = require("../config/cloudinary.config");

// @desc    Get all projects
// @route   GET /api/v1/projects/
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({});
    if (!projects) {
      next(new ErrorResponse('No projects found', 404));
      return;
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
      return;
    }
    res.status(200).json({ data: project })
  } catch (error) {
    next(error);
  }
});

// @desc    Upload a picture to Cloudinary
// @route   POST /api/v1/projects/upload
// @access  Private
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new ErrorResponse('Error uploading the image', 500));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

// @desc    Create a project
// @route   POST /api/v1/projects
// @access  Public
router.post('/', isAuthenticated, async (req, res, next) => {
  const { title, description, imageUrl } = req.body;
  try {
    const project = await Project.create({ title, description, imageUrl });
    if (!project) {
      next(new ErrorResponse('An error ocurred while creating the project', 500));
      return;
    }
    res.status(201).json({ data: project })
  } catch (error) {
    next(error);
  }
});

// @desc    Edit a project
// @route   PUT /api/v1/projects/:id
// @access  Public
router.put('/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const project = await Project.findById(id);
    if (!project) {
      next(new ErrorResponse(`Project not found by id: ${id}`, 404));
      return;
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
      return;
    } else {
      const deleted = await Project.findByIdAndDelete(id);
      res.status(202).json({ data: deleted });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
