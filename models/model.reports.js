const { Product } = require('xero-node/dist/gen/model/appstore/product');
const db = require('../connection');

const calcProfitLoss = async(startDate, enddate)=>{

    try{
        const connection = await db.getConnection();
    const query = `SELECT *
                    FROM Invoice
                    JOIN Sale_Item ON Invoice.No = Sale_Item.Invoice_No
                    WHERE Invoice.Date_Time BETWEEN ? AND ?`;


    const [results] = await connection.execute(query, [startDate, enddate]);
    connection.release();

    let total_sale = 0
    let total_cost = 0
    for(const arr of results){
        total_sale += parseFloat(arr.Unit_Price);
        total_cost += parseFloat(arr.Purchase_Price);
    }
    //console.log("Total Sale : ", total_sale);
    //console.log("Total Cost : ", total_cost);

    const Profit_loss = total_sale - total_cost;

    //console.log("Net Profit : ", Profit_loss);


    return {
        total_sale: total_sale,
        total_cost: total_cost,
        profit_loss: Profit_loss
    };

    }catch(error){
        console.log("Error Reporting Model", error)
        throw error;
    }
}

const StockMomentReport = async()=>{
    try{
        const connection = await db.getConnection();

        const stockQuery = `SELECT SUM(purchase_item.Quantity) AS Total_Quantity, purchase_product.Product_ID, 
                            product.Name, product_category.Description 
                            FROM 
                            purchase_item 
                            JOIN 
                            purchase_product ON purchase_product.Purchase_Item_ID = purchase_item.ID 
                            JOIN 
                            product ON purchase_product.Product_ID = product.ID 
                            JOIN 
                            product_category ON product.Category_ID = product_category.ID 
                            GROUP BY 
                            product.ID`;

        const [stockresults] = await connection.execute(stockQuery);
        connection.release();

        return stockresults
        
    }catch(error){
        console.log("Error Reporting Model", error)
        throw error;
    }
}

const saleItemreport = async(productId)=>{
    try{
        const connection = await db.getConnection();
        const saleQuery = '';

        const [saleresults] = await connection.execute(stockQuery);
        connection.release();

        return salekresults


    }catch(error){
        console.log("Error Reporting Model", error)
        throw error;
    }
}

module.exports = {calcProfitLoss, StockMomentReport, saleItemreport}