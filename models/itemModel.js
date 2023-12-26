const db = require('../connection');

const addItem = (itemData, callback) => {
    const { code, itemName, categoryId, unitId } = itemData;
  
    const query = 'INSERT INTO product (Code, Name, Category_ID,Unit_ID) VALUES (?,?,?,?)';
    const values = [
      code, itemName, categoryId, unitId
    ]
  
    db.query(query, values, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  };
  
  const deleteItem = async (itemId, callback) => {
    const sql = 'DELETE FROM product WHERE ID = ?';
    await db.query(sql, [itemId], (err, results) => {
      if (err) {
        console.error('Error deleting item:', err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  };
  

  const updateItem = (itemData,itemId, callback) => {
    const { code, itemName, categoryId, unitId } = itemData;
  
    const query = 'UPDATE product SET Code=?, Name=?, Category_ID=?,Unit_ID=? WHERE ID = ?';
    const values = [
      code, itemName, categoryId, unitId, itemId 
    ]
  
    db.query(query, values, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  };


//   const getAllItems = (req, res)=>{

//     //const sql = "select * from product";
//     const sql= `SELECT
//                     product.*,
//                     product_category.Description AS CategoryName,
//                     product_unit.Description AS UnitName
//                 FROM
//                     product
//                     JOIN product_category ON product.Category_ID = product_category.ID
//                     JOIN product_unit ON product.Unit_ID = product_unit.ID
//                 ORDER BY
//                     product.code;
//                 `
//     console.log("Request has reached item model")

//     db.query(sql, (err,results)=>{
//         if (err) {
//             console.error('Error Item', err);
//             return res.status(500).json({ error: 'Error Selecting Supplier' });
//        }
       
//        else if (results) {
//             //res.status(200).json({ message: 'Item Info successfully', Item: results});//This property name 'Item' is referred in the setItem(response.data.Item) function in the frontend
//             console.log('results are returned');
//             console.log(res);
//             return res;
//        }else{
//             return res.status(500).json({ error: 'Internal Server' });
//       }

//     });

//   //   db.query(sql, (err, results) => {
//   //     if (err) {
//   //         console.error('Error executing query:', err);
//   //         return res.status(500).json({ error: 'Error executing database query' });
//   //     }

//   //     console.log('Query results:', results);

//   //     if (results && results.length > 0) {
//   //         res.status(200).json({ message: 'Item Info successfully', Item: results });
//   //     } else {
//   //         console.error('No results found or unexpected result structure');
//   //         return res.status(500).json({ error: 'No results found or unexpected result structure' });
//   //     }
//   // });
// }


// const getAllItems = (callback) => {

//       const sql= `SELECT
//                     product.*,
//                     product_category.Description AS CategoryName,
//                     product_unit.Description AS UnitName
//                 FROM
//                     product
//                     JOIN product_category ON product.Category_ID = product_category.ID
//                     JOIN product_unit ON product.Unit_ID = product_unit.ID
//                 ORDER BY
//                     product.code;
//                 `

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error fetching items', err);
//       return callback(err, null);
//     }
//     return callback(null, results);
//   });
// };





const getAllItems =  async () => {
  try {
          const sql= `SELECT
                    product.*,
                    product_category.Description AS CategoryName,
                    product_unit.Description AS UnitName
                FROM
                    product
                    JOIN product_category ON product.Category_ID = product_category.ID
                    JOIN product_unit ON product.Unit_ID = product_unit.ID
                ORDER BY
                    product.code;
                `
    const [results] = await db.query(sql);
    console.log(results);
    return results;
  } catch (err) {
    throw err;
  }
};

  module.exports = { addItem, deleteItem ,updateItem,getAllItems};