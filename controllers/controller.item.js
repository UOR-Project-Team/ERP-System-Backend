const ItemModel = require('../models/model.item');


const Additem = async (req, res) => {

  try{
    const { code, itemName, categoryId, unitId, supplierId } = req.body;
    const itemData = { code, itemName, categoryId, unitId, supplierId };
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
    const { code, itemName, categoryId, unitId, supplierId } = req.body;
    const itemData = { code, itemName, categoryId, unitId, supplierId };
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
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching all items:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const getAllItemsByUnit = async (req, res) => {
  try {
    const unitId = req.params.id;
    const data =  await ItemModel.getAllItemsByUnitID(unitId);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching all items:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const getAllItemsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const data =  await ItemModel.getAllItemsByCategoryID(categoryId);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching all items:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

const getAllItemsBySupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const data =  await ItemModel.getAllItemsBySupplierID(supplierId);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching all items:', err);
    res.status(500).json({ error: 'Error occured while read!' });
  }
};

module.exports = { Additem,deleteItem, updateItem, getAllItems, getAllItemsByUnit, getAllItemsByCategory, getAllItemsBySupplier };