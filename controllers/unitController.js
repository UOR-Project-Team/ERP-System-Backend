const categoryModel = require('../models/unitModel');

const createunit = (req, res) => {

  const { Description, SI } = req.body;
  const unitData = {Description, SI };
  
  // const categoryData = {
  //   unit: req.body.Unit
  // };

  categoryModel.createUnit(unitData, (err, results) => {
    if (err) {
      console.error('Error creating Unit:', err);
      return res.status(500).json({ error: 'Error creating Unit' });
    }else if(results && results.insertId){
      res.status(201).json({ message: 'Unit created successfully', id: results.insertId });
    }else{
      return res.status(500).json({ error: 'Internal Server Error222' });
    }
    
  });
};

module.exports = { createunit };