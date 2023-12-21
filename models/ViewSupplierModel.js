const db = require('../dbConfig');

const Showsupplier = (req, res)=>{

    const sql = "select * from supplier";

    db.query(sql, (err,results)=>{
        if (err) {
            console.error('Error Supplier', err);
            return res.status(500).json({ error: 'Error Selecting Supplier' });
       }else if (results) {
            res.status(200).json({ message: 'Supplier Info successfully', Supplier: results});
       }else{
            return res.status(500).json({ error: 'Internal Server' });
      }

    });
}

module.exports = {Showsupplier}