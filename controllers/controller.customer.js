const customerModel = require('../models/model.customer');

const createCustomer = async (req, res) => {
  try {
    const { title, fullname, email, nic, contactno, street1, street2, city, country, vatno } = req.body;
    const data = { title, fullname, email, nic, contactno, street1, street2, city, country, vatno };
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

module.exports = { createCustomer, readCustomer, readAllCustomers, updateCustomer, deleteCustomer };
