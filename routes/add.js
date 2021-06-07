var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "loveisone",
  database: "drstone",
  multipleStatements: true,
});
mysqlConnection.connect((err) => {
  if (err) {
    console.log("Not seccess", err);
  } else {
    console.log("sucess");
  }
});

router.post("/", function (req, res,next) {
  console.log("added")
  var ob = req.body
  var name;
  for(key in ob){
    name=key
  }
  mysqlConnection.query(`select COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH,  
       IS_NULLABLE 
from INFORMATION_SCHEMA.COLUMNS
where TABLE_NAME='${name}'`,(err,rows,fields)=>{
  if(err){
    res.send(err)
  }else{
    res.send(rows)
  }
  
})
  
    // res.render("tables", {
    //   title: "Express",
    //   data: data,
    //   tablenames: tablenames,
    // });
});

module.exports = router;