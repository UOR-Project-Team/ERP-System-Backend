const db = require('../dbConfig');

const createUnit = (unitData, callback) => {
  //const { description } = categoryData;

  const {Description, SI} = unitData;
   
  const query = "INSERT INTO product_unit (Description, SI) VALUES (?, ?)";
  const values = [
    Description,SI
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


const deleteUnit = (unitId, callback) => {
  const sql = 'DELETE FROM product_unit WHERE ID = ?';
  db.query(sql, [unitId], (err, results) => {
    if (err) {
      console.error('Error deleting unit:', err);
      return callback(err, null);
    }
    return callback(null, results);
  });
};



const retrieveUnitById = (unitId, callback) => {
  const sql = "SELECT * FROM product_unit WHERE ID = ?";
  

  db.query(sql, [unitId], (err, results) => {
    if (err) {
      console.error('Error retrieving unit by ID', err);
      return callback(err, null);
    }

    if (results.length === 0) {
      //console.log(unitId);//Testing
      return callback(null, null); // Unit not found
      
    }

    const unit = results[0];
    callback(null, unit);
  });
};



module.exports = {createUnit,retrieveUnits,deleteUnit,retrieveUnitById};

