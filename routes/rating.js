const router = require("express").Router();
const Rating = require("../model/Rating");
const User = require("../model/User");
const Tvshow = require("../model/Tvshow");
const TOKEN_SECRET = require("../config");
const jwt = require("jsonwebtoken");

router.post('/', async(req, res)=>{
    const {token, tvShowName, rating} = req.body; 
    if(!token){
        res.json({message:"error"});

    }else{
        
        try {
            const verified = jwt.verify(token, TOKEN_SECRET);
            const currentuser = await User.findOne({username: verified.username});
            
            const currentShow  = await Tvshow.findOne({title: tvShowName});
       
            const newRating = new Rating({
                rating: rating,
                user: currentuser._id,
                tvshow: currentShow._id
            });
            await newRating.save();
            res.status(200).send("you have given rating");
          
        } catch (err) {
            res.status(400).json({ message:"invalid token"});
        }
    }
  
});

module.exports = router;