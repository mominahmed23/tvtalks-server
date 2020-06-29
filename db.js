const mongoose = require("mongoose");
const mongoConnection="mongodb://127.0.0.1:27017/tvtalks";

mongoose.connect(mongoConnection,{useNewUrlParser: true,
useUnifiedTopology:true}, (err) =>{
    if(err){
        console.log(err);
    }else{
        console.log("connected yyoo");
    }
});
