const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController');
const categorylist = require('../models/Categorylist')

router.post('/create', categoryController.createCategory);
router.get('/show',categorylist.Showcategory);

 module.exports = router;