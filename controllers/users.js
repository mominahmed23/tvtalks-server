const User = require("../models/User");
module.exports = {
    signUp: async (req, res, next)=>{
        const {username, password} = req.body; 
        console.log("signup called", req.body.username);
        const newUser = new User({username, password});
        res.send("saved");
        newUser.save();
        
    },
    signIn: async (req, res, next)=>{
        console.log("signin called");
    },
    secret: async (req, res, next)=>{
        console.log("secret called");
    }
}