const categoryModel = require('../models/model.category');

const createCategory = async (req, res) => {
  try {
    const { Description } = req.body;
    const categoryData = { Description };

    const categoryId = await categoryModel.createCategory(categoryData);
    res.status(201).json({ message: 'Category created successfully', categoryId, Description });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Error creating category' });
  }
};

const readAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();

    if (categories.length > 0) {
      res.status(200).json({ message: 'Categories retrieved successfully', categories });
    } else {
      res.status(404).json({ message: 'No categories found' });
    }
  } catch (err) {
    console.error('Error selecting categories:', err);
    res.status(500).json({ error: 'Error selecting categories from the database' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await categoryModel.deleteCategory(categoryId);

    
      res.status(200).json({ message: 'Category deleted successfully' });
    
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'Error deleting category' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    
    const categoryData = req.body;

    await categoryModel.updateCategory(categoryId, categoryData);

    
      res.status(200).json({ message: 'Category updated successfully' });
   
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Error updating category' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const result = await categoryModel.getCategoryById(categoryId);

    if (result) {
      res.status(200).json({ message: 'Category retrieved successfully', category: result });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    console.error('Error getting category by ID:', err);
    res.status(500).json({ error: 'Error getting category by ID' });
  }
};

module.exports = {
  createCategory,
  readAllCategories,
  deleteCategory,
  updateCategory,
  getCategoryById,
};
