const db = require('../dbConfig');

const Showcategory = (req, res)=>{

    const sql = "select * from product_category";

    db.query(sql, (err,results)=>{
        if (err) {
            console.error('Error Category', err);
            return res.status(500).json({ error: 'Error Selecting Category' });
       }else if (results) {
            res.status(200).json({ message: 'Supplier Info Category', Category: results});
       }else{
            return res.status(500).json({ error: 'Internal Server Category' });
      }

    });
}

module.exports = {Showcategory};