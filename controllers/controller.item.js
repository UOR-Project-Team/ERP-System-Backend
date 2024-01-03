const ItemModel = require('../models/model.item');


const Additem = async (req, res) => {

  try{
    const { code, itemName, categoryId, unitId } = req.body;
    const itemData = { code, itemName, categoryId, unitId };
    const itemId = await ItemModel.addItem(itemData)
    res.status(201).json({message: 'Item Added Successfully',itemId,itemData});
  }
  catch(err){
    console.error('Error Adding Item:', err);
    res.status(500).json({error: 'Error creating category'});
  }

};



const deleteItem = async (req, res) => {

  try{
    const itemId = req.params.id;
    await ItemModel.deleteItem(itemId);

    res.status(200).json({message: 'Item deleted successfully'});

  }
  catch(err)
  {
    console.error('Error deleting item:',err);
    res.status(500).json({error: 'Error deleting item'});
  }

};


const updateItem = async (req, res) => {
  try{
    const itemId = req.params.id
    const { code, itemName, categoryId, unitId } = req.body;
    const itemData = { code, itemName, categoryId, unitId };

    await ItemModel.updateItem(itemData, itemId);
    res.status(200).json({message: 'Item has been updated successfully'});
  }
  catch(err){
    console.error('Error updating item',err);
    res.status(500).json({error:'Error updating item'});
  }

};

const getAllItems = async (req, res) => {
  try {
    const data =  await ItemModel.getAllItems();
    console.log("Request has reached item controller")
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching all items:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};


module.exports = { Additem,deleteItem, updateItem, getAllItems };