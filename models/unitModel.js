const db = require('../dbConfig');

const createunit = (categoryData, callback) => {
  //const { description } = categoryData;

  const {description, si} = categoryData;
   
  const query = "INSERT INTO Product_Category (Description,SI) VALUES (?,?)";
  const values = [
    description,si
  ]
  db.query(query, values, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};



const retrieveUnits = (req, res)=>{

  const sql = "select * from product_unit";

  db.query(sql, (err,results)=>{
      if (err) {
          console.error('Error unit', err);
          return res.status(500).json({ error: 'Error Selecting unit' });
     }else if (results) {
          res.status(200).json({ message: 'Unit array passed successfully', units: results});
     }else{
          return res.status(500).json({ error: 'Internal Server' });
    }

  });
}


22-s12-t02-view-supplier-backend-development


module.exports = {retrieveUnits,retrieveUnits};

