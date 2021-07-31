var express = require("express");
var router = express.Router();
// const confirm = require('confirm-dialog');
const mysqlConnection = require("./mysqlconn.js");


router.post("/", function (req, res,next) {
  // console.log("added")
  var ob = req.body
  // var id = req.params;
  // console.log(id)
  console.log(ob)
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
    mysqlConnection.query(`select COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH,  
       IS_NULLABLE 
    from INFORMATION_SCHEMA.COLUMNS
    where TABLE_NAME='${name}'`,(err,rows,fields)=>{

      if(err){
        res.send(err)
      }else{
        if(Object.keys(ob)[0]=="users"){
          var main=rows.slice(0,2);
        }else{
          var main=rows;
        }
        rows.shift()
        res.render("add",{data:main,tablename:name,cond:'add'});
      }
    });
  } else if(ob[Object.keys(ob)[0]]=='EDIT'){
      
      mysqlConnection.query(`select COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,IS_NULLABLE
      from INFORMATION_SCHEMA.COLUMNS
      where TABLE_NAME='${ob.tablename}'`,(err,rows,fields)=>{
        if(err){
          res.send(err)
        }
        
        var main=rows;
        
        console.log(rows)
        if(typeof(ob.id)==typeof([])){
          var condition =  ob.id[0];
          id = [ob.id[0],Object.keys(ob)[0]]
        }else{
          var condition = ob.id;
          id = [ob.id,Object.keys(ob)[0]]
        }
        mysqlConnection.query(`select * from ${ob.tablename} where ${condition}=${Object.keys(ob)[0]}`,(err,rows,fields)=>{
          console.log(`select * from ${ob.tablename} where ${value[0]}=${Object.keys(ob)[0]}`)
          // console.log(rows)
          
          res.render("add",{data:main,rows:rows,tablename:ob.tablename,cond:'edit',id:id})
          // res.send(rows);
        })
      })
      
  } else if(ob[Object.keys(ob)[0]]=='DELETE'){
      mysqlConnection.query(`delete from ${ob.tablename} where ${ob.id[0]}=${Object.keys(ob)[0]}`,(err,rows,fields)=>{
        if(err){
          res.send(err)
        }else{
          res.redirect('/tables')
        }
      })
  }else if(ob[Object.keys(ob)[0]]=='VIEW'){
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
  }else{
    var tablename=ob.tablename;
    var select=ob.selectbox;
    var search=ob.search;
    var id= ob.id[0];
    mysqlConnection.query(`SELECT * from ${tablename} where ${select}='${search}'`,(err,rows,fields)=>{
      if(err){
        res.send(err)
      }else{
        var data =[rows]
        res.render("tables",{
          title:"Express",
          data:data,
          tablenames:[tablename],
          cond:"view"
        })
      }
    })
    // res.send(ob);
    
  }
  
})
  
    


module.exports = router;