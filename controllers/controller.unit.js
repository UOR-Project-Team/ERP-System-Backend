const unitModel = require('../models/model.unit');

const createUnit = async (req, res) => {
  try {
    const { Description , SI } = req.body;
    const unitData = { Description ,SI };

    const unitId = await unitModel.createUnit(unitData);
    res.status(201).json({ message: 'Unit created successfully', unitId, Description, SI });
  } catch (err) {
    console.error('Error creating unit:', err);
    res.status(500).json({ error: 'Error creating unit' });
  }
};

const readAllUnits = async (req, res) => {
  try {
    const units = await unitModel.getAllUnits();

    if (units.length > 0) {
       
      res.status(200).json({ message: 'Units retrieved successfully', units });
    } else {
      res.status(404).json({ message: 'No Units found' });
    }
  } catch (err) {
    console.error('Error selecting units:', err);
    res.status(500).json({ error: 'Error selecting units from the database' });
  }
};

const deleteUnit = async (req, res) => {
  try {
    const unitId = req.params.id;
    await unitModel.deleteUnit(unitId);

    
      res.status(200).json({ message: 'Unit deleted successfully' });
    
  } catch (err) {
    console.error('Error deleting unit:', err);
    res.status(500).json({ error: 'Error deleting unit' });
  }
};

const updateUnit = async (req, res) => {
  try {
    const unitId = req.params.id;
    
    const unitData = req.body;

    await unitModel.updateUnit(unitId, unitData);

    
      res.status(200).json({ message: 'Unit updated successfully' });
   
  } catch (err) {
    console.error('Error updating unit:', err);
    res.status(500).json({ error: 'Error updating unit' });
  }
};

const getUnitById = async (req, res) => {
  try {
    const unitId = req.params.id;
    const result = await unitModel.getUnitById(unitId);

    if (result) {
      res.status(200).json({ message: 'Unit retrieved successfully', unit: result });
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } catch (err) {
    console.error('Error getting unit by ID:', err);
    res.status(500).json({ error: 'Error getting unit by ID' });
  }
};

module.exports = {
  createUnit,
  readAllUnits,
  deleteUnit,
  updateUnit,
  getUnitById,
};
