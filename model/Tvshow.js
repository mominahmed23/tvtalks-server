const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create schema
const userSchema = new Schema({
    image: String,
    title: String,
    year: String
});

//create model
const Tvshow = mongoose.model('tvshow', userSchema);

//export model
module.exports = Tvshow;

