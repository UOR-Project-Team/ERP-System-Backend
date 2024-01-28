const express = require('express');
const router = express.Router();
const reportController = require('../controllers/controller.report');

// Middleware to check if connected to Xero
const checkXeroConnection = (req, res, next) => {
  if (!req.session.xeroTokenSet) {
    return res.status(401).send('Not connected to Xero');
  }
  next();
};

// Redirect to Xero for consent
router.get('/connect', async (req, res) => {
  try {
    await reportController.redirectToXero(req, res);
  } catch (error) {
    console.error("Error in /connect route:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle Xero callback
router.get('/callback', async (req, res) => {
  try {
    await reportController.handleXeroCallback(req, res);
  } catch (error) {
    console.error("Error in /callback route:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Fetch Authenticated User Details
router.get('/user', checkXeroConnection,reportController.refreshAccessTokenIfNeeded, async (req, res) => {
  try {
    await reportController.fetchUserDetails(req, res);
  } catch (error) {
    console.error("Error in /user-details route:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
