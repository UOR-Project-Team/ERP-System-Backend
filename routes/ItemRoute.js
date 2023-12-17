const express = require('express');
const additemController = require('../controllers/itemController');
const showItemInfo = require('../models/viewItemModel')

const router = express.Router();

router.post('/create', additemController.Additem);

router.get('/show',showItemInfo.Showitem);

router.delete('/delete/:id', additemController.deleteItem);

module.exports = router;