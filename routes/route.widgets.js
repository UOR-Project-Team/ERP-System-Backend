const express = require('express');
const router = express.Router();
const widgetsController = require('../controllers/controller.widgets')

router.get('/data', widgetsController.saleCount)

module.exports = router;