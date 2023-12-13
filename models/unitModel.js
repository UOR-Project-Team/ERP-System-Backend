// userModel.js
const db = require('../dbConfig');



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





module.exports = {retrieveUnits};
