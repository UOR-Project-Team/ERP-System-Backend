const grnModel = require('../models/model.grn');

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await grnModel.getAllSuppliers();
   
    if (suppliers.length > 0) {
        res.status(200).json(suppliers);
      } else {
        res.status(404).json({ message: 'No supplier found' });
      }
  } catch (err) {
    console.error('Error fetching all supplier:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const getItemsById = async (req, res) => {
    try {
      const supplierId = req.params.id;
      const data = await grnModel.getAllItems(supplierId);
  
      if (!data) {
        return res.status(404).json({ error: 'Items not found!' });
      }

      res.status(200).json(data);

    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error occured while read!' });
    }
  };

module.exports = { getSuppliers,  getItemsById };
