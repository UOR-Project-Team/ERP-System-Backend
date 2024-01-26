const validateCustomer = require('./validator.customer');
const customerModel = require('../models/model.customer');

const createCustomer = async (req, res) => {
  try {
    const data = req.body;

    //validate the input data
    const validationErrors = validateCustomer(data);

    // Check if there are validation errors
    const hasValidationErrors = Object.values(validationErrors).some((error) => !!error);

    if (hasValidationErrors) {
      return res.status(400).json({ message: 'Invalid Submission!!!' });
    }
    
    const customerId = await customerModel.createCustomer(data);
    res.status(201).json({ message: 'Customer created successfully', customerId });
  } catch (err) {
    console.error('Error creating customer:', err);
    if (err.code === 'ER_DUP_ENTRY' || err.code === 1062) {
      const attributeNameMatch = err.sqlMessage.match(/for key '(.+?)'/);
      const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'unknown';
      res.status(409).json({ message: `Duplicate Entry!`, attributeName });
    } else {
      res.status(500).json({ message: 'Error occurred while creation!' });
    }
  }
};

const readCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const data = await customerModel.getCustomerById(customerId);

    if (!data) {
      return res.status(404).json({ error: 'Customer not found!' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const readAllCustomers = async (req, res) => {
  try {
    const data = await customerModel.getAllCustomers();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching all customer:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    //validate the input data
    const validationErrors = validateCustomer(data);

    // Check if there are validation errors
    const hasValidationErrors = Object.values(validationErrors).some((error) => !!error);

    if (hasValidationErrors) {
      return res.status(400).json({ message: 'Invalid Submission!!!' });
    }

    await customerModel.updateCustomer(id, data);
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY' || err.code === 1062) {
      const attributeNameMatch = err.sqlMessage.match(/for key '(.+?)'/);
      const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'unknown';
      res.status(409).json({ message: `Duplicate Entry!`, attributeName });
    } else {
      res.status(500).json({ message: 'Error occurred while updating!' });
    }
    console.error('Error updating customer:', err);
  }
};

const activateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await customerModel.activateCustomer(id);
    res.status(200).json({ message: 'Customer activated successfully' });
  } catch (err) {
    console.error('Error activate Customer:', err);
    res.status(500).json({ message: 'Error occurred while Activating!' });
  }
};

const deactivateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await customerModel.deactivateCustomer(id);
    res.status(200).json({ message: 'Customer deactivated successfully' });
  } catch (err) {
    console.error('Error deactivate Customer:', err);
    res.status(500).json({ message: 'Error occurred while Deactivating!' });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await customerModel.deleteCustomer(id);
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({ error: 'Error occured while deletion!' });
  }
};

module.exports = { createCustomer, readCustomer, readAllCustomers, updateCustomer, activateCustomer, deactivateCustomer, deleteCustomer };
