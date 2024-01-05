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
      const data = await grnModel.getAllItems();
  
      if (!data) {
        return res.status(404).json({ error: 'Items not found!' });
      }

      res.status(200).json(data);

    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error occured while read!' });
    }
  };

  const grnlist = async(req,res)=>{
    try{

      const { grnNo, supplierid,userid, items, totalAmount } = req.body;
      //const grninfo = { grnNo, suppliername, items,product, totalAmount }
      // const totaldata = items.length;
      // const totalresult = 0;

      // if (!Array.isArray(grninfo)) {
      //   return res.status(400).send('Invalid grn data format');
      // }

      const grn = await grnModel.addgrn(grnNo,supplierid,userid,items,totalAmount)


      if(grn){
        res.status(200).json({message: 'Succesfully Inserted', grnid: grn})
      }else{
        res.status(500).json({message: 'Failed to Inserted', grnid : grn})
      }
    }catch(error){
      console.error('Error updating grn:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = { getSuppliers,  getItemsById, grnlist };
