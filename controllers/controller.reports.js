const reportModel = require('../models/model.reports')

const profitandloss = async(req, res)=>{
    try{
        console.log("req body", req.body)
    //const {startDate, endDate} = req.body;
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    console.log("Date", startDate, endDate);

    const { total_sale, total_cost, profit_loss } = await reportModel.calcProfitLoss(startDate,endDate);
    //console.log("Result is", result)
    if(!total_cost && !total_sale){
        res.status(400).json({ message: 'Invoice Data Not exits' });
    }

    res.status(200).json({
                total_sale: total_sale,
                total_cost: total_cost,
                profit_loss: profit_loss
            });
    

    }catch(error){
        console.log("Error Reporting", error);
        res.status(500).json({ message: 'Internel Server error' });
    }

}

const StockMoment = async(req, res)=>{
    try{
        const stockReport = await reportModel.StockMomentReport();

        res.status(200).json(stockReport);

    }catch(error){
        console.log("Error Reporting", error);
        res.status(500).json({ message: 'Internel Server error' });
    }
}

module.exports = {profitandloss, StockMoment}