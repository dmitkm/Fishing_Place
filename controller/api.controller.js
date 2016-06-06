var mongoose = require("mongoose"),
    User = require("../model/users.js");

module.exports.session_middleware = function(req,res,next){

    console.log(req.user);
    if(req.session && req.session.user){
        User.findOne({email:req.session.user.email}, function(err,user){
            if(err){
                throw Error("db error!try again");
            }
            if(user){
                req.user=user;
                req.user.password=undefined;
                //console.log("user:" +req.user);
                req.session.user=req.user;
                console.log(req.user);
            }
            next();
        });
    }else{
        next();
    }
};
module.exports.isAuth = function(req,res,next){
    console.log(req);
    if(!req.user){
        res.status(401).send("Unauthorized!Please log in");
    }else{
        next();
    }
};
