const invoicedisplayModel = require('../models/model.invoice');

const getinvoice = async (req, res) => {
  try {
    const customers = await invoicedisplayModel.getAllinvoice();
   
    if (invoice.length > 0) {
        res.status(200).json(invoice);
      } else {
        res.status(404).json({ message: 'No invoice found' });
      }
  } catch (err) {
    console.error('Error fetching all invoice:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const getsale_item = async (req, res) => {
    try {
      const customers = await invoiceModel.getAllsale_item();
     
      if (sale_item.length > 0) {
          res.status(200).json(sale_item);
        } else {
          res.status(404).json({ message: 'No sale_item found' });
        }
    } catch (err) {
      console.error('Error fetching all sale_item:', err);
      res.status(500).json({ error: 'Error occured while read!' });
    }
  };


  module.exports = { getinvoice, getsale_item};
