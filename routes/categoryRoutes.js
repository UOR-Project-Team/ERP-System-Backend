const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController');
const categoryModel= require('../models/categoryModel');

router.post('/create', categoryController.createCategory);

//router.get('/get', categoryController.getAllCategories);

router.get('/get', categoryModel.retrieveCategories);

 module.exports = router;