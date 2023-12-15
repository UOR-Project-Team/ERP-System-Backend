const db = require('../dbConfig');

const addSupplier = (userData, callback) => {
  const { Fullname,RegistrationNo,Email,ContactNo,FAX,Address,City,Description,VATNo, } = userData;

  const query = 'INSERT INTO supplier (Fullname,RegistrationNo,Email,ContactNo,FAX,Address,City,Description,VATNo,Credit,Status) VALUES (?,?,?,?,?,?,?,?,?,0,1)';
  const values = [
    Fullname,RegistrationNo,Email,ContactNo,FAX,Address,City,Description,VATNo
  ]

  db.query(query, values, (err, data) => {
    if (err) {
      console.log("test m1");
      return callback(err, null);
    }
    console.log("test m2");
    return callback(null, data);
  });
};

const Showsupplier = (callback) => {
  const query = 'SELECT * FROM supplier';

  db.query(query, (err, data) => {
      if (err) {
          console.error('Error executing query', err);
          return callback(err, null);
      }
      return callback(null, data);
  });
};


const deletesupplier = (id , callback)=>{
  

  const sql = 'DELETE FROM supplier WHERE ID = ?';
  db.query(sql,id ,(err,data)=>{
    if (err) {
      console.error('Error executing query', err);
      return callback(err, null);
  }
  console.log(data)
  return callback(null, data);
  })
}

const updatesupplier = (id,newData, callback)=>{

  const { Fullname,RegistrationNo,Email,ContactNo,FAX,Address,City,Description,VATNo, } = newData; 

  const sql = 'UPDATE supplier SET Fullname = ?, RegistrationNo = ?, Email = ?, ContactNo = ?, FAX = ?, Address = ?, City = ?, Description = ?, VATNo = ? WHERE ID = ?';
  const values = [newData.Fullname, newData.RegistrationNo,newData.Email,newData.ContactNo,newData.FAX,newData.Address,newData.City,newData.Description,newData.VATNo, id]; // Replace with the updated values and ID

  db.query(sql,values ,(err,data)=>{
    if (err) {
      console.error('Error executing query', err);
      return callback(err, null);
  }
  console.log(data)
  return callback(null, data);
  })

}

const getsupplierById =(id, callback)=>{

  const sql = 'SELECT * FROM supplier WHERE ID = ?';
  db.query(sql,id ,(err,data)=>{
    if (err) {
      console.error('Error executing query', err);
      return callback(err, null);
  }
  console.log(data)
  return callback(null, data);
  })
}

module.exports = { addSupplier,Showsupplier,deletesupplier,updatesupplier,getsupplierById };