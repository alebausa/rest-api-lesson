const router = require('express').Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Get all projects
// @route   GET /api/v1/user/loggedInUser
// @access  Private
router.get('/loggedInUser', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id);
    if (!user) {
      next(new ErrorResponse('No user found', 404));
      return;
    }
    res.status(200).json({ data: user })
  } catch (error) {
    next(error);
  }
});

// @desc    Get all projects
// @route   GET /api/v1/user/edit
// @access  Private
router.put('/edit', isAuthenticated, async (req, res, next) => {
  const { email, username } = req.body;
  // Check if email or password or name are provided as empty string 
  if (email === "" || username === "") {
    return next(new ErrorResponse('Please fill all the fields to register', 400))
  }
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorResponse('Email is not a valid format', 400))
  }
  try {
    const user = await User.findById(req.payload._id);
    if (!user) {
      next(new ErrorResponse('No user found', 404));
      return;
    } else {
      const updatedUser = await User.findByIdAndUpdate(req.payload._id, req.body, { new: true });
      res.status(200).json({ data: updatedUser })
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;