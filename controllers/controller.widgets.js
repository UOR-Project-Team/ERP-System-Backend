const widgetsModel = require('../models/model.widgets')

const saleCount = async(req, res)=>{
    try{
        const widgetResult = await widgetsModel.getSalecount();

        if(!widgetResult){
            res.status(400).json({message: 'Invalide Data'})
        }

        res.status(200).json({
            saleCount : widgetResult.saleCount,
            productCount : widgetResult.productCount,
            supplierCount : widgetResult.supplierCount,
            customerCount : widgetResult.customerCount,
        })

    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = {saleCount}