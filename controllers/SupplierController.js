const addSuplierModel = require('../models/SupplierModel') 


const addSupplier = async(req, res) => {

    try{


    const userData = {
        Fullname: req.body.Fullname,
        RegistrationNo: req.body.RegistrationNo,
        Email: req.body.Email,
        ContactNo: req.body.ContactNo,
        FAX: req.body.FAX,
        Address:req.body.Address,
        City: req.body.City,
        Description: req.body.Description,
        VATNo: req.body.VATNo,
      };

      addSuplierModel.addSupplier(userData, (err, results) => {
                if (err) {
                     console.error('Error creating Supplier', err);
                     return res.status(500).json({ error: err.sqlMessage });
                }else if (results && results.insertId) {
                     res.status(200).json({ message: 'Supplier created successfully', userId: results.insertId });
                }else{
                    
                     return res.status(501).json({ error: 'Internal Server Error' });
               }
        });
    }catch(e){
        console.log(e);
    }

};



module.exports = { addSupplier};