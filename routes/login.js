var express = require("express");
var router = express.Router();
// const mysql = require("mysql");
const mysqlConnection = require('./mysqlconn')






router.post("/", function (req, res, next) {
    // res.send(req.body);
    username = req.body.username;
    password = req.body.password;
    console.log("Username",username);
    console.log("Password",password)
    if((username=="admin")&&(password=="admin")){
        res.render("index",{title:"Express"});
    }else{
        mysqlConnection.query(`select * from Users where Username = '${username}'`,(err,rows,fields)=>{
            if(err){
                res.send(err);
            }else{
                data = rows[0];
                if((data.Username==username) && (data.Password_==password)){
                    res.render("user",{title:"Express"});
                }else{
                    res.send("Username or password incoorect");
                }
                // res.send(data);
            }
        })
    }

    

});
  
module.exports = router;