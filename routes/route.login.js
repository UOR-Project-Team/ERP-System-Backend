// Import the express framework
const express = require('express');

// Import the LoginController to handle login-related routes
const LoginController = require('../controllers/controller.login');

// Create an instance of the Express router
const router = express.Router();

// Define routes for login-related endpoints
// Route for user login
router.post('/reset/:name', LoginController.resetPasswordController); // Route for resetting password

// Export the router for use in other files
module.exports = router;