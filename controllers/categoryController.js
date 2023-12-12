const categoryModel = require('../models/categoryModel');

const createCategory = ((req, res) => {
//  // const Description = req.body.Description;
   const { Description } = req.body;
// //    // console.log("hello");
 const categoryData = { Description };

  // const categoryData = {
  //   category: req.body.Description
  // };

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

module.exports = { createCategory , showCategory};