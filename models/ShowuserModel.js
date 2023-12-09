const db = require('../dbConfig');

const Showuser = (req, res)=>{

    const sql = "select * from users";

    db.query(sql, (err,results)=>{
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.status(200).json({ message: 'User Information', user: results });

    });
}

module.exports = {Showuser}