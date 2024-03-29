const ItemModel = require('../models/model.item');


const Additem = async (req, res) => {

  try{
    const { code, itemName, categoryId, unitId, supplierId, reorderLevel, reorderQuantity } = req.body;
    const itemData = { code, itemName, categoryId, unitId, supplierId, reorderLevel, reorderQuantity };
    const itemId = await ItemModel.addItem(itemData)
    res.status(201).json({message: 'Item Added Successfully',itemId});
  } catch (err) {
    console.error('Error creating Product:', err);
    if (err.code === 'ER_DUP_ENTRY' || err.code === 1062) {
      const attributeNameMatch = err.sqlMessage.match(/for key '(.+?)'/);
      const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'unknown';
      res.status(409).json({ message: `Duplicate Entry!`, attributeName });
    } else {
      res.status(500).json({ message: 'Error occurred while creation!' });
    }
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
    const { code, itemName, categoryId, unitId, supplierId, reorderLevel,reorderQuantity } = req.body;
    const itemData = { code, itemName, categoryId, unitId, supplierId, reorderLevel, reorderQuantity };
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

const getProductCode = async (req, res) => {
  try {
    
    const productCode =  await ItemModel.getProductCode();
    res.status(200).json(productCode);
  } catch (err) {
    console.error('Error fetching product code :', err);
    res.status(500).json({ error: 'Error occured while generating product code!' });
  }
};

module.exports = { Additem,deleteItem, updateItem, getAllItems, getAllItemsByUnit, getAllItemsByCategory, getAllItemsBySupplier, getProductCode };