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






  /* GET users listing. */
router.get("/", function (req, res, next) {
  const gettablenames = () =>{
  return new Promise((resolve,reject)=>{
    mysqlConnection.query("show tables",(err,rows,fields)=>{
        if (err){
          console.log("First Function",err)
          reject(err);
        } else{
          resolve(rows);
        }
      });
    });
  };

  const getcolumndata = (element,key) =>{
    return new Promise((resolve,reject)=>{
      mysqlConnection.query(`SELECT * from ${element[key]}`,(err,rows,fields)=>{
        if(err){
          console.log("Second function",err)
          reject(err);
        } else{
          resolve(rows);
        }
      });
    });
  };
  const allfunct = async () => {
    var tablenames = [];
    var data = [];
    var array_of_table = await gettablenames();
    // console.log(array_of_table);
    for (element of array_of_table){
      for (key in element){
        console.log(element[key]);
        tablenames.push(element[key]);
        var object_of_data = await getcolumndata(element,key);
        data.push(object_of_data);
        
      }
    }
    // console.log(data)
    // console.log(tablenames)
    var newarr = [tablenames,data];
    return newarr;
  }
  const start = async () => {
    var newarr = await allfunct()
    var tablenames = newarr[0]
    var data = newarr[1]
    // console.log(tablenames);
    res.render("tables", {
        title: "Express",
        data: data,
        tablenames: tablenames,
        cond:"table"
    });
  }
  start();
  
  
  
  
});

  


module.exports = router;
