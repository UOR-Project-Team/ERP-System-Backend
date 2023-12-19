const categoryModel = require('../models/categoryModel');

const createCategory = ((req, res) => {

   const { Description } = req.body;
   const categoryData = { Description };

   categoryModel.createCategory(categoryData, (err, results) => {
    if (err) {
      console.error('Error creating Category:', err);
      return res.status(500).json({ error: 'Error creating categoty' });
    }else if(results && results.insertId){
      res.status(201).json({ message: 'Category created successfully', id: results.insertId ,Description});
    }else{
      return res.status(500).json({ error: 'Internal Server Error222' });
    }
    
  });
});

const showCategory = (req, res) => {
  categoryModel.showCategory((err, results) => {
    if (err) {
      console.error('Error selecting categories:', err);
      return res.status(500).json({ error: 'Error selecting categories from the database' });
    }

    if (results) {
      res.status(200).json({ message: 'Categories retrieved successfully', categories: results });
    } else {
      res.status(404).json({ message: 'No categories found' });
    }
  });
};

const deleteCategory = (req, res) => {
  const categoryId = req.params.id;

 categoryModel.deleteCategory(categoryId, (err, results) => {
    if (err) {
      console.error('Error deleting category:', err);
      return res.status(500).json({ error: 'Error deleting category' });
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  });
};
const updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const { Description } = req.body;
  const categoryData = { Description };

  categoryModel.updateCategory(categoryId, categoryData, (err, results) => {
    if (err) {
      console.error('Error updating category:', err);
      return res.status(500).json({ error: 'Error updating category' });
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Category updated successfully', id: categoryId, Description });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  });
};

const getCategoryById = (req, res) => {
  const categoryId = req.params.id;

  categoryModel.getCategoryById(categoryId, (err, result) => {
    if (err) {
      console.error('Error getting category by ID:', err);
      return res.status(500).json({ error: 'Error getting category by ID' });
    }

    if (result) {
      res.status(200).json({ message: 'Category retrieved successfully', category: result });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  });
};


module.exports = { createCategory , showCategory , deleteCategory , updateCategory ,getCategoryById};

