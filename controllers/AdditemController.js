const addItemModel = require('../models/AdditemModel');

const Additem = (req, res) => {
  const { code, itemName, categoryId, unitId } = req.body;
   // console.log("hello");
  const itemData = { code, itemName, categoryId, unitId };

  addItemModel.addItem(itemData, (err, results) => {
    if (err) {
      console.error('Error Adding Item:', err);
      return res.status(500).json({ error: 'Error Adding Item' });
    }else if(results && results.insertId){
      res.status(201).json({ message: 'Item Added Successfully', id: results.insertId });
    }else{
      return res.status(500).json({ error: 'Internal Server Error222' });
    }
    
  });
};

module.exports = { Additem };