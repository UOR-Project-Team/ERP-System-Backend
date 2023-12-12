const express = require('express');
const additemController = require('../controllers/AdditemController');
const showItemInfo = require('../models/viewItemModel')

const router = express.Router();

router.post('/create', additemController.Additem);

router.get('/show',showItemInfo.Showitem);

module.exports = router;