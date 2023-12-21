const SuplierModel = require('../models/SupplierModel') 


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

      SuplierModel.addSupplier(userData, (err, results) => {
                if (err) {
                     console.error('Error creating Supplier', err);
                     console.log("test 1");
                     return res.status(500).json({ error: err.sqlMessage });
                }else if (results && results.insertId) {
                    console.log("test 2");
                     res.status(200).json({ message: 'Supplier created successfully', userId: results.insertId });
                }else{
                    console.log("test 3");
                     return res.status(501).json({ error: 'Internal Server Error' });
               }
        });
    }catch(e){
        console.log(e);
    }

};

const GetAllSupplier = (req, res) => {
    SuplierModel.Showsupplier((err, results) => {
        if (err) {
            console.error('Error retrieving Suppliers', err);
            return res.status(500).json({ error: err.sqlMessage || 'Internal Server Error' });
        } else if (results && results.length > 0) {
            res.status(200).json({ message: 'Suppliers retrieved successfully', Supplier: results });
        } else {
            return res.status(404).json({ error: 'No Suppliers found' });
        }
    });
};


const deleteSupplier = (req,res) =>{

    const {id} = req.params;   //using params to to get id from url

    SuplierModel.deletesupplier(id,(err,results)=>{
        if (err) {
            console.error('Error Deleting Suppliers', err);
            return res.status(500).json({ error: err.sqlMessage || 'Internal Server Error' });
        } else if (results && results.affectedRows > 0) {
            res.status(200).json({ message: 'Supplier deleted successfully', affectedRows: results.affectedRows });
        } else {
            return res.status(404).json({ error: 'No Suppliers found' });
        }
    })
}

const getSupplierById = (req,res)=>{

    const {id} = req.params;

    SuplierModel.getsupplierById(id,(err,results)=>{
        if (err) {
            console.error('Error Getting Suppliers', err);
            return res.status(500).json({ error: err.sqlMessage || 'Internal Server Error' });
        } else if (results && results.length > 0) {
            res.status(200).json({ message: 'Suppliers retrieved successfully', Supplier: results });
        } else {
            return res.status(404).json({ error: 'No Suppliers found' });
        }
    })
}

const updateSupplier = (req,res)=>{

    const {id} = req.params;

    const newData = {
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

    SuplierModel.updatesupplier(id,newData,(err,results)=>{
        if (err) {
            console.error('Error Updating Suppliers', err);
            return res.status(500).json({ error: err.sqlMessage || 'Internal Server Error' });
        } else if (results && results.affectedRows > 0) {
            res.status(200).json({ message: 'Supplier Updating successfully', affectedRows: results.affectedRows });
        } else {
            return res.status(404).json({ error: 'No Suppliers found' });
        }
    })
}



module.exports = { addSupplier,GetAllSupplier,deleteSupplier,getSupplierById,updateSupplier};