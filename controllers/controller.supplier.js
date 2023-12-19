
const supplierModel = require('../models/model.supplier');

const createSupplier = async (req, res) => {
  try {
    const { Fullname, RegistrationNo, Email, ContactNo, FAX , Address, City, Description, VATNo } = req.body;
    const data = { Fullname, RegistrationNo, Email, ContactNo, FAX , Address, City , Description, VATNo };

    const supplierId = await supplierModel.createSupplier(data);
    res.status(201).json({ message: 'Supplier created successfully', supplierId });
  } catch (err) {
    console.error('Error creating supplier:', err);
    res.status(500).json({ error: 'Error occured while creation!' });
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
    console.error('Error updating supplier:', err);
    res.status(500).json({ error: 'Error occured while updation!' });
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

module.exports = { createSupplier, getSupplierById, readAllSuppliers, updateSupplier, deleteSupplier };
