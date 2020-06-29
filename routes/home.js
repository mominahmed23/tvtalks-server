const router = require("express").Router();
const User = require("../model/User");
const Tvshow = require("../model/Tvshow");
const Rating = require("../model/Rating");
const TOKEN_SECRET = require("../config");
const jwt = require("jsonwebtoken");

const findRating = async () =>{
        const ratings = await Rating.find();
        return ratings;
}

calcAvgRating=(id, r)=>{
    let flag = false;
    let avgrating = 0;
    let counter = 0;
    r.forEach(element => {
        if(element.tvshow.equals(id)){
            flag = true;
            avgrating+= element.rating;
            counter++;
        }
    });
    if(!flag){
        return null;
    }
    return Math.round(avgrating / counter);
}

calcUserRating=(id, r, userid)=>{
    let rt = null;
    r.forEach(element => {
        
        if(element.tvshow.equals(id)){
            
            if(element.user.equals(userid)){
               rt = element.rating;
                
            }
        }
    });
    return rt;
}

createDataWithoutUser=(t, r)=>{
    let temparr=[];
    let ratingarr=[];
    for(let i = 0; i < t.length; i++){
     let rating = calcAvgRating(t[i]._id, r);
     let tempobj = {...t[i]._doc};
     tempobj.rating = rating;
     temparr.push(tempobj);
    }
    return temparr;
}

createDataWithUser=(t, r, userid)=>{
    let temparr=[];
    let urating;
    for(let i = 0; i < t.length; i++){
     let rating = calcAvgRating(t[i]._id, r);
     urating = calcUserRating(t[i]._id, r, userid);
     let tempobj = {...t[i]._doc};
     tempobj.rating = rating;
     tempobj.userRating = urating;
     temparr.push(tempobj);
    }
    return temparr;
}


router.post('/', async(req, res)=>{
    const {token} = req.body; 
    let finalData;
    try{
        const tvshows = await Tvshow.find();
        const ratings = await findRating();
        if(!token){
            finalData = createDataWithoutUser(tvshows, ratings);
            res.json({tvshows: finalData});
           
    
        }else{
            
            try {
                const verified = jwt.verify(token, TOKEN_SECRET);
                const currentuser = await User.findOne({username: verified.username});
                finalData = createDataWithUser(tvshows, ratings, currentuser._id);
                res.json({tvshows: finalData});
            } catch (err) {
                res.json({tvshows, message:"invalid token"});
            }
        }

    

        
    }
    catch(err){
         res.json({err});
    }
    
 
  
});

module.exports = router;