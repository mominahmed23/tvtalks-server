const router = require("express").Router();
const User = require("../model/User");
const Tvshow = require("../model/Tvshow");
const TOKEN_SECRET = require("../config");
const jwt = require("jsonwebtoken");

router.post('/', async(req, res)=>{
    const {token} = req.body; 
    const tvshows = await Tvshow.find({});
    if(!token){
        res.json({tvshows});

    }else{
        
        try {
            const verified = jwt.verify(token, TOKEN_SECRET);
            res.json({tvshows, user:verified});
        } catch (err) {
            res.json({tvshows, message:"invalid token"});
        }
    }
  
});

module.exports = router;