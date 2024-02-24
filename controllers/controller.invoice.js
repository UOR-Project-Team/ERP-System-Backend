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
      //console.log("body ", req.body)
      const {barcode} = req.body;

      //console.log("barcode is", barcode)
      const data = await invoiceModel.getItemPriceById(barcode);
      //console.log("data is", data)
  
      if (!data) {
        return res.status(404).json({ error: 'Items not found!' });
      }

      res.status(200).json(data);

    } catch (err) {
      //console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error occured while read!' });
    }
  };

  const addinvoicelist = async(req, res)=>{
    try{

      const { invoiceNumber, Customerid, userid, solditems, totalAmount } = req.body;

      if (!invoiceNumber || !userid || !Array.isArray(solditems) || isNaN(totalAmount)) {
        return res.status(401).json({ error: 'Invalid or missing parameters' });
      }
  
      for (const solditem of solditems) {
        if (!solditem.productId || isNaN(solditem.quantity) || isNaN(solditem.s_price) || !solditem.barcode) {
          return res.status(402).json({ error: 'Invalid item data format' });
        }
      }

      const invoice = await invoiceModel.addinvoice(invoiceNumber, Customerid,userid, solditems, totalAmount)

      if(invoice){
        res.status(201).json({message: 'Succesfully Inserted'})
      }else{
        res.status(400).json({message: 'Failed to Inserted'})
      }
      


    }catch (err) {
      console.error('Error updating Invoice items:', err);
      return res.status(500).json({ error: 'Error occured while read!', err });
    }
  }


  const getAllInvoices = async (req, res) => {
    try {
        const invoices = await invoiceModel.getAllInvoices();
   
        if (invoices.length > 0) {
            res.status(200).json(invoices);
          } else {
            res.status(404).json({ message: 'No invoice found' });
          }

    } catch (err) {
      console.error('Error fetching invoices:', err);
      res.status(500).json({ error: 'Error occured while read!' });
    }
  };

  const getInvoiceByNo = async (req, res) => {
    try {
      const invoiceNo = req.params.id;
      const data = await invoiceModel.getInvoiceByNo(invoiceNo);
      console.log("controller work");
  
      if (!data) {
        return res.status(404).json({ error: 'Invoice not found!' });
      }

      res.status(200).json(data);

    } catch (err) {
      console.error('Error fetching invoice:', err);
      res.status(500).json({ error: 'Error occured while read!' });
    }
  };

  const getSalesItemsByNo = async (req, res) => {
    try {
      const invoiceNo = req.params.id;
      const data = await invoiceModel.getSalesItemsByNo(invoiceNo);
      console.log("controller work for item");
  
      if (!data) {
        return res.status(404).json({ error: 'Sales items not found!' });
      }

      res.status(200).json(data);

    } catch (err) {
      console.error('Error fetching sales items:', err);
      res.status(500).json({ error: 'Error occured while read!' });
    }
  };

module.exports = { getCustomers,  getItemPriceById , getAllItems,addinvoicelist, getAllInvoices ,getInvoiceByNo ,getSalesItemsByNo };
