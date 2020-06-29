const express = require("express");
var cors = require('cors');
const userRoutes = require("./routes/users");
const homeRoute = require("./routes/home");
const ratingRoute = require("./routes/rating");

const app = express();

const connection = require("./db");

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/users", userRoutes);
app.use("/home", homeRoute);
app.use("/add", ratingRoute);

//start the server
const port = app.get('port') || 5000;
app.listen(port, ()=>{
    console.log(`server is listening at port ${port}`);
});


