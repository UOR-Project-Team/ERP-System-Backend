const categoryModel = require('../models/categoryModel');

const createCategory = (req, res) => {
  const { description } = req.body;
    console.log("hello");
  const categoryData = { description };

  categoryModel.createCategory(categoryData, (err, results) => {
    if (err) {
      console.error('Error creating Category:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Category created successfully', id: results.id });
  });
};

module.exports = { createCategory };