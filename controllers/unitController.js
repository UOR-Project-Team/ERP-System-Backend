const categoryModel = require('../models/categoryModel');

const createunit = (req, res) => {

  const categoryData = {
    category: req.body.Category
  };

  categoryModel.createunit(categoryData, (err, results) => {
    if (err) {
      console.error('Error creating Category:', err);
      return res.status(500).json({ error: 'Error creating categoty' });
    }else if(results && results.insertId){
      res.status(201).json({ message: 'Category created successfully', id: results.insertId });
    }else{
      return res.status(500).json({ error: 'Internal Server Error222' });
    }
    
  });
};

module.exports = { createunit };