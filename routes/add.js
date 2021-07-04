var express = require("express");
var router = express.Router();
const mysqlConnection = require("./mysqlconn.js");


router.post("/", function (req, res,next) {
  // console.log("added")
  var ob = req.body
  // var id = req.params;
  // console.log(id)
  // console.log(ob)
  var name;
  var value;
  if(Object.getOwnPropertyNames(ob).length == 1){
    
    for(key in ob){
      name=key
      value=ob[key]
    }
  }else{
    name= Object.keys(ob)[0]
    value=ob[Object.keys(ob)[0]]
  }
  
  // console.log(name)
  // console.log(value)
  if(value=="ADD"){
    // console.log('hello')
    mysqlConnection.query(`select COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH,  
       IS_NULLABLE 
    from INFORMATION_SCHEMA.COLUMNS
    where TABLE_NAME='${name}'`,(err,rows,fields)=>{

      if(err){
        res.send(err)
      }else{
        // console.log(rows)
        res.render("add",{data:rows,tablename:name,cond:'add'});
        // res.send(rows)
      }
    });
  } else if(ob[Object.keys(ob)[0]]=='EDIT'){
      mysqlConnection.query(`select COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,IS_NULLABLE
      from INFORMATION_SCHEMA.COLUMNS
      where TABLE_NAME='${ob.tablename}'`,(err,rows,fields)=>{
        var main=rows;
        // console.log(rows)
        mysqlConnection.query(`select * from ${ob.tablename} where ${ob.id[0]}=${Object.keys(ob)[0]}`,(err,rows,fields)=>{
          // console.log(`select * from ${ob.tablename} where ${value[0]}=${Object.keys(ob)[0]}`)
          // console.log(rows)
          id = [ob.id[0],Object.keys(ob)[0]]
          res.render("add",{data:main,rows:rows,tablename:ob.tablename,cond:'edit',id:id})
          // res.send(rows);
        })
      })
      
  }else{
      var tablename=[name]
      mysqlConnection.query(`SELECT * from ${name}`,(err,rows,fields)=>{
        if (err){
          res.send(err)
        } else{
          var data =[rows]
          res.render("tables",{
            title:"Express",
            data:data,
            tablenames:tablename,
            cond:"view"
          })
        }
      });
  }
  
})
  
    


module.exports = router;