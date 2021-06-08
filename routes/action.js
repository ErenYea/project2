var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "loveisone",
  database: "helloworld",
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
    var data = req.body;
    var arr = [];
    var array_of_column_name=[];
    function isNumeric(str) {
      if (typeof str != "string") return false // we only process strings!  
      return !isNaN(str)  
    }

    for(key in data){
      if (isNumeric(data[key])){
        var num = parseInt(data[key]);
        arr.push(num);
      } else{
        arr.push(data[key]);
      }
      array_of_column_name.push(key)
    }
    var tablename = arr.shift();
    array_of_column_name.shift();
    // arr.reverse();
    var huz = "'" + arr.join("','") + "'";
    var ham = "" + array_of_column_name.join(",") + "";
    mysqlConnection.query(`insert into ${tablename} (${ham}) values (${huz})`,(err,rows,fields)=>{
        if(err){
            res.send(err)
        } else{
            res.redirect('/tables')
        }
    })
    // res.send(ham) ;
    
});

module.exports = router;