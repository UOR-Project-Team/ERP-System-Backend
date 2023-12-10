const categoryModel = require('../models/categoryModel');

const createCategory = (req, res) => {

  const {Category} = req.body;
  const { description } = Category;
   // console.log("hello");
  const categoryData = { description };

  categoryModel.createCategory(categoryData, (err, results) => {
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

module.exports = { createCategory };