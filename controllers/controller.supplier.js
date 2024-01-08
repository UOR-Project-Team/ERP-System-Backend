
const supplierModel = require('../models/model.supplier');

const createSupplier = async (req, res) => {
  try {
    const { Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country } = req.body;
    const data = { Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country };

    const supplierId = await supplierModel.createSupplier(data);
    res.status(201).json({ message: 'Supplier created successfully', supplierId });
  } catch (err) {
    console.error('Error creating Supplier:', err);
    if (err.code === 'ER_DUP_ENTRY' || err.code === 1062) {
      const attributeNameMatch = err.sqlMessage.match(/for key '(.+?)'/);
      const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'unknown';
      res.status(400).json({ message: `Duplicate Entry!`, attributeName });
    } else {
      res.status(500).json({ message: 'Error occurred while creation!' });
    }
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const data = await supplierModel.getSupplierById(supplierId);

    if (!data) {
      return res.status(404).json({ error: 'Supplier not found!' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching supplier:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const readAllSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierModel.getAllSuppliers();
   
    if (suppliers.length > 0) {
        res.status(200).json({ message: 'Categories retrieved successfully', suppliers });
      } else {
        res.status(404).json({ message: 'No categories found' });
      }
  } catch (err) {
    console.error('Error fetching all supplier:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await supplierModel.updateSupplier(id, data);
    res.status(200).json({ message: 'Supplier updated successfully' });
  } catch (err) {
    console.error('Error creating Supplier:', err);
    if (err.code === 'ER_DUP_ENTRY' || err.code === 1062) {
      const attributeNameMatch = err.sqlMessage.match(/for key '(.+?)'/);
      const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'unknown';
      res.status(400).json({ message: `Duplicate Entry!`, attributeName });
    } else {
      res.status(500).json({ message: 'Error occurred while Updation!' });
    }
  }
};

const activateSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    await supplierModel.activateSupplier(id);
    res.status(200).json({ message: 'Supplier activated successfully' });
  } catch (err) {
    console.error('Error activate Supplier:', err);
    res.status(500).json({ message: 'Error occurred while Activating!' });
  }
};

const deactivateSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    await supplierModel.deactivateSupplier(id);
    res.status(200).json({ message: 'Supplier deactivated successfully' });
  } catch (err) {
    console.error('Error deactivate Supplier:', err);
    res.status(500).json({ message: 'Error occurred while Deactivating!' });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;

    await supplierModel.deleteSupplier(supplierId);
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    console.error('Error deleting supplier:', err);
    res.status(500).json({ error: 'Error occured while deletion!' });
  }
};

module.exports = { createSupplier, getSupplierById, readAllSuppliers, updateSupplier, activateSupplier, deactivateSupplier, deleteSupplier };
