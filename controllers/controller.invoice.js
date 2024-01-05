const invoiceModel = require('../models/model.invoice');

const getCustomers = async (req, res) => {
  try {
    const customers = await invoiceModel.getAllCustomers();
   
    if (customers.length > 0) {
        res.status(200).json(customers);
      } else {
        res.status(404).json({ message: 'No customer found' });
      }
  } catch (err) {
    console.error('Error fetching all customer:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const getAllItems = async (req, res) => {
    try {
        const items = await invoiceModel.getAllItems();
   
        if (items.length > 0) {
            res.status(200).json(items);
          } else {
            res.status(404).json({ message: 'No item found' });
          }

    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error occured while read!' });
    }
  };
  const getItemPriceById = async (req, res) => {
    try {
      const ProductId = req.params.id;
      const data = await invoiceModel.getItemPriceById(ProductId);
  
      if (!data) {
        return res.status(404).json({ error: 'Items not found!' });
      }

      res.status(200).json(data);

    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error occured while read!' });
    }
  };

module.exports = { getCustomers,  getItemPriceById , getAllItems };
