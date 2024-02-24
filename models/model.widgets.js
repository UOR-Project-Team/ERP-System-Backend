const db = require('../connection')

const getSalecount = async()=>{
    let connection
    try{
        connection = await db.getConnection();

        const saleQuery = 'SELECT COUNT(*) AS total_sales FROM invoice WHERE DATE(Date_Time) = ?';
        const CURRENT_DATE = new Date().toISOString().split('T')[0];
        const [saleresults] = await connection.execute(saleQuery, [CURRENT_DATE]);

        const productQuery = 'SELECT COUNT(DISTINCT Name) AS total_products FROM product';
        const [productResult] = await connection.execute(productQuery);

        const supplierQuery = 'SELECT COUNT(DISTINCT Fullname) AS total_supplier FROM supplier';
        const [supplierResult] = await connection.execute(supplierQuery);

        const customerQuery = 'SELECT COUNT(DISTINCT Fullname) AS total_customer FROM customer';
        const [customerResult] = await connection.execute(customerQuery);

 
        return {
            saleCount : saleresults[0].total_sale,
            productCount : productResult[0].total_products,
            supplierCount : supplierResult[0].total_supplier,
            customerCount : customerResult[0].total_customer,
        }

    }catch(error){
        throw error;
    }finally{
        connection.release();
    }
}

module.exports = {getSalecount}