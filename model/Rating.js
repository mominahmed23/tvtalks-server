const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create schema
const ratingSchema = new Schema({
    rating: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    tvshow:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'tvshow'
    }
});

//create model
const Rating = mongoose.model('Rating', ratingSchema);

//export model
module.exports = Rating;

