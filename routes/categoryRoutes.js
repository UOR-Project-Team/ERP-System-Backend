const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController');
const categoryModel= require('../models/categoryModel');

router.post('/create', categoryController.createCategory);
router.get('/show', categoryController.showCategory);
router.delete('/delete/:id', categoryController.deleteCategory);
router.get('/show/:id',categoryController.getCategoryById);
router.put('/update/:id', categoryController.updateCategory);

 module.exports = router;