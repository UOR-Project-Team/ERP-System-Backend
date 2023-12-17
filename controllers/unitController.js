const UnitModel = require('../models/unitModel');

const createunit = (req, res) => {

  const { Description, SI } = req.body;
  const unitData = {Description, SI };
  
  // const categoryData = {
  //   unit: req.body.Unit
  // };

  UnitModel.createUnit(unitData, (err, results) => {
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


const deleteUnit = (req, res) => {
  const unitId = req.params.id;

  UnitModel.deleteUnit(unitId, (err, results) => {
    if (err) {
      console.error('Error deleting unit:', err);
      return res.status(500).json({ error: 'Error deleting unit' });
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Unit deleted successfully' });
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  });
};

const getUnitById = (req, res) => {
  const unitId  = req.params.id;
  console.log(unitId);//testing
  UnitModel.retrieveUnitById(unitId, (err, unit) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving unit by ID' });
    }

    if (!unit) {
      return res.status(404).json({ error: 'Unit not found' });
    }

    res.status(200).json({ message: 'Unit retrieved successfully', unit });
  });
};

module.exports = { deleteUnit,createunit, getUnitById };