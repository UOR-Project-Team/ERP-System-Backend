const ItemModel = require('../models/itemModel');

const Additem = (req, res) => {
  const { code, itemName, categoryId, unitId } = req.body;
   // console.log("hello");
  const itemData = { code, itemName, categoryId, unitId };

  ItemModel.addItem(itemData, (err, results) => {
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


const deleteItem = (req, res) => {
  const itemId = req.params.id;

  ItemModel.deleteItem(itemId, (err, results) => {
    if (err) {
      console.error('Error deleting item:', err);
      return res.status(500).json({ error: 'Error deleting item' });
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });
};


const updateItem = (req, res) => {
  const itemId = req.params.id
  const { code, itemName, categoryId, unitId } = req.body;
  
  const itemData = { code, itemName, categoryId, unitId };

  ItemModel.updateItem(itemData, itemId, (err, results) => {
    if (err) {
      console.error('Error Updating Item:', err);
      return res.status(500).json({ error: 'Error Updating Item' });
    }else if(results && results.insertId){
      res.status(201).json({ message: 'Item Updated Successfully', id: results.insertId });
    }else{
      return res.status(500).json({ error: 'Internal Server Error222' });
    }
    
  });
};


module.exports = { Additem,deleteItem, updateItem };