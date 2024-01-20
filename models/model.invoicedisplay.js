const db = require('../connection');

const getAllinvoice = async () => {
    try {
      const query = 'SELECT * FROM invoice';
      const [results] = await db.execute(query);
      return results;
    } catch (err) {
      throw err;
    }
  };


  const getAllsale_item = async () => {
    try {
      const query = 'SELECT * FROM sale_item';
      const [results] = await db.execute(query);
      return results;
    } catch (err) {
      throw err;
    }
  };


  module.exports = { getAllinvoice, getAllsale_item};


