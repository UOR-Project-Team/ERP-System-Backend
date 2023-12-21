const express = require('express');
const { createCategory, getCategoryById , readAllCategories, updateCategory, deleteCategory } = require('../controllers/controller.category');


const router = express.Router();

router.post('/create', createCategory);
router.get('/:id', getCategoryById);
router.get('/', readAllCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
