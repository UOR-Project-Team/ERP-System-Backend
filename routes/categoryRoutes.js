const express = require('express')
const route = express.Router()
const mysql= require('mysql2');


// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'mysqluserpwd',
//     database: 'add_category'
//   });

//  route.post("/", (req , res)=>{
//      const sql = "INSERT INTO category (Name,Description) VALUES (?)"
//      const values=  [
//         req.body.Name,
//         req.body.Description
//      ]
     

//      connection.query(sql,[values],(err,data) =>{
//         if(err) return res.json('error');
//         return res.json(data);
//      })
//  })

 module.exports = route