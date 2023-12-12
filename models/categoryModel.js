// userModel.js
const db = require('../dbConfig');

const createCategory = ((categoryData, callback) => {
  // const { Description } = categoryData;
  const {Description}=categoryData;
   
  const query = 'INSERT INTO Product_Category (Description) values (?)';
  db.query(query, Description, (err, results) => {
    if (err) {
      console.error('Error in createCategory:',err);
      return callback(err, null);
    }
    return callback(null, results);
  });
});

// const Showcategory = (req, res)=>{

//   const sql = "select * from Product_Category";

//   db.query(sql, (err,results)=>{
//       if (err) {
//           console.error('Error selecting Category', err);
//           return res.status(500).json({ error: 'Error Selecting Category from the database' });
//      }else if (results.length>0) {
//           res.status(200).json({ message: 'Category retrived successfully', category:results});
//      }else{
//           return res.status(500).json({ error: 'Internal Server Category' });
//     }

//   });
// }

const showCategory = (callback) => {
  const sql = 'SELECT * FROM Product_Category';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error selecting categories:', err);
      return callback(err, null);
    }
    return callback(null, results);
  });
};

module.exports = { createCategory , showCategory };