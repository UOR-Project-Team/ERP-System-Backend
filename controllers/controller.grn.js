const grnModel = require('../models/model.grn');

const getSuppliers = async (req, res) => {
  try {
    //const search = req.query.term;
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
      const result = await grnModel.getAllItems();
     // console.log('Items In data', data)
      if (result.length === 0) {
        return res.status(404).json({ error: 'Items not found!' });
      }

      res.status(200).json(result);

    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error occured while read!' });
    }
  };

  const grnlist = async(req,res)=>{
    try{

      const { grnNo, supplierid,userid, puchaseditems, totalAmount } = req.body;

      console.log('received')
      if (!grnNo || !supplierid || !userid || !Array.isArray(puchaseditems) || isNaN(totalAmount)) {
        console.log('test 1')
        return res.status(400).json({ error: 'Invalid or missing parameters' });
      }
  
      for (const item of puchaseditems) {
        if (!item.productId || isNaN(item.quantity) || isNaN(item.purchase_price)) {
          console.log('test 2')
          return res.status(400).json({ error: 'Invalid item data format' });
        }
      }

      const grn = await grnModel.addgrn(grnNo,supplierid,userid,puchaseditems,totalAmount)


      if(grn){
        res.status(201).json({message: 'Succesfully Inserted', grnid: grn})
      }else{
        res.status(400).json({message: 'Failed to Inserted', grnid : grn})
      }
    }catch(err){
      console.error('Error updating grn:', err);
      return res.status(500).json({ err: 'Internal Server Error' });
    }
  }

module.exports = { getSuppliers,  getItemsById, grnlist };
