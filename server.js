const connection = require("./model");
const express = require("express");
const app = express();
var post =  require("./model/post.model");

app.get("/", (req,res)=>{
    res.send("<h1>helloooo</h1>");
});

app.get("/posts", (req,res)=>{
    post.find({},function (err, docs) {
        if(err){
            res.send("error occured");
        }else{
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Hearders', '*');
           
          
               
                res.json(docs);
            
            
        }
    })
        
    
});


app.listen(5000);


