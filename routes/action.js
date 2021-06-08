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
    var data = req.body
    var arr = []
    for(key in data){
        arr.push(data[key])
    }
    var tablename = arr.shift()
    var huz = "'" + arr.join("','") + "'"
    mysqlConnection.query(`insert into ${tablename} 
    values (${huz})`,(err,rows,fields)=>{
        if(err){
            res.send(err)
        } else{
            res.redirect('/tables')
        }
    })
    // res.send(data) 
    
});

module.exports = router;