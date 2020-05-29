const router = require("express").Router();
const User = require("../model/User");
const TOKEN_SECRET = require("../config");
const jwt = require("jsonwebtoken");

router.post('/signup', async(req, res)=>{
    const {username, password} = req.body; 
    const foundUser = await User.findOne({ username });
       if(foundUser){
            res.json({message:"user already exists"});
        }else{
            const newUser = new User({username, password});
            try{
                await newUser.save();

                const token = jwt.sign(
                   { username: foundUser.username },
                   TOKEN_SECRET
               )
               res.json({message:"user saved",
               token
               });
            }catch(err){
                res.json({message:err});
            }
          
        }
});

router.post('/login', async(req, res)=>{
    const {username, password} = req.body;
    const foundUser = await User.findOne({ username });
       if(!foundUser){
        return res.json({message:"incorrect username"});
        }
        
        if(password !== foundUser.password){
          
            res.json({message:"incorrect password"});
        
        }else{
            const token = jwt.sign(
                { username: foundUser.username },
                TOKEN_SECRET
            )
            res.json({message:"logged in successful",
            token
            });
        }
});



module.exports = router;