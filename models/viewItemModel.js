const db = require('../dbConfig');

const Showitem = (req, res)=>{

    //const sql = "select * from product";
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

    db.query(sql, (err,results)=>{
        if (err) {
            console.error('Error Item', err);
            return res.status(500).json({ error: 'Error Selecting Supplier' });
       }else if (results) {
            res.status(200).json({ message: 'Item Info successfully', Item: results});//This property name 'Item' is referred in the setItem(response.data.Item) function in the frontend
       }else{
            return res.status(500).json({ error: 'Internal Server' });
      }

    });
}

module.exports = {Showitem}