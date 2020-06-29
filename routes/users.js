const router = require("express").Router();
const User = require("../model/User");
const TOKEN_SECRET = require("../config");
const jwt = require("jsonwebtoken");

router.post('/signup', async(req, res)=>{
    const {username, password} = req.body; 
    const foundUser = await User.findOne({ username });
       if(foundUser){
            res.status(400).json({message:"user already exists"});
        }else{
            const newUser = new User({username, password});
            try{
                await newUser.save();

                const token = jwt.sign(
                   { username: newUser.username },
                   TOKEN_SECRET
               )
               res.status(200).json({message:"user saved",
               name:newUser.username,
               token
               });
            }catch(err){
                res.status(400).json({message:err});
            }
          
        }
});

router.post('/login', async(req, res)=>{
    const {username, password} = req.body;
    const foundUser = await User.findOne({ username });
       if(!foundUser){
        return res.status(400).json({message:"incorrect username"});
        }
        
        if(password !== foundUser.password){
          
            res.status(400).json({message:"incorrect password"});
        
        }else{
            const token = jwt.sign(
                { username: foundUser.username },
                TOKEN_SECRET
            )
            res.status(200).json({message:"logged in successful",
            name:foundUser.username,
            token
            });
        }
});



module.exports = router;