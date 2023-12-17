const db = require('../dbConfig');

const addSupplier = (userData, callback) => {
  const { Fullname,RegistrationNo,Email,ContactNo,FAX,Address,City,Description,VATNo, } = userData;

  const query = 'INSERT INTO Supplier (Fullname,RegistrationNo,Email,ContactNo,FAX,Address,City,Description,VATNo,Credit,Status) VALUES (?,?,?,?,?,?,?,?,?,0,1)';
  const values = [
    Fullname,RegistrationNo,Email,ContactNo,FAX,Address,City,Description,VATNo
  ]

  db.query(query, values, (err, data) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, data);
  });
};


module.exports = { addSupplier };