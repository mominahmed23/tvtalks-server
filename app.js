const express = require("express");
const userRoutes = require('./routes/users');
const app = express();
const bodyParser = require("body-parser");

//middlewares
app.use(bodyParser.json());

//routes
app.use("/users", userRoutes);

//start the server
const port = app.get('port') || 5000;
app.listen(port, ()=>{
    console.log(`server is listening at port ${port}`);
});


