// userModel.js
const db = require('../dbConfig');

const createCategory = (categoryData, callback) => {
  const { description } = categoryData;
   
  const query = 'INSERT INTO product_category(description) values(?)';
  db.query(query, description, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};



const retrieveCategories = (req, res)=>{

  const sql = "select * from product_category";

  db.query(sql, (err,results)=>{
      if (err) {
          console.error('Error category', err);
          return res.status(500).json({ error: 'Error Selecting category' });
     }else if (results) {
          res.status(200).json({ message: 'category array passed successfully', categories: results});
     }else{
          return res.status(500).json({ error: 'Internal Server' });
    }

  });
}


























// const getAllCategories = async () => {
//   try {
//     const [rows] = await db.query('SELECT * FROM product_category');
    
//     return rows;
//   } catch (err) {
//     console.error('Error fetching categories:', err);
//     return [];
//   }
// };




// const getAllCategories = (callback) => {
   
//   const query2 = 'SELECT * FROM product_category';
//   db.query(query2,(err, results) => {
//     if (err) {
//       return callback(err, null);
//     }
//     return callback(null, results);
//   });
// };

// const getAllCategories = async () => {
//   try {
//     //console.log("req has reached categoryModel!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//     const result = await db.query('SELECT * FROM product_category');
//     const [rows] = result

//     return rows;
//   } catch (err) {
//     console.error('Error fetching categories:', err);
//     return [];
//   }
// };


 
  // db.query(query2, (err, results) => {
  //   if (err) {
  //     return callback(err, null);
  //   }
  //   return callback(null, results);
  // })
  
  // const getAllCategories = (callback) => {
  //   const query = 'SELECT * FROM category';
  //   db.query(query, (err, results) => {
  //     if (err) {
  //       return callback(err, null);
  //     }
  //     return callback(null, results);
  //   });
  // };
  
  
  
  
  //  const getAllCategories = async () => {
  //    const [rows] = await db.execute('SELECT * FROM category');
  //    console.log('req has reached categoryModel')
  //    return rows;
  //  };




module.exports = {retrieveCategories,createCategory};

//module.exports = { createCategory };