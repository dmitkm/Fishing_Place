/**
 * Created by Dmitry on 6/3/2016.
 */


var mongoose = require("mongoose"),
    User = require("../model/users.js"),
    passport = require("passport");


module.exports.login = function(req, res, next){

    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err);
        }

        if(user){
            return res.json({token: user.getToken()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);

    /*
    User.findOne({username:req.body.username},function(err,user){
        if(err) throw new Error('Database error!');

        if(!user){
            res.status(401).send({error:"User Not Found!Try again!"});
        }else{

            if(user.isValidPassword(req.body.password)){
                req.session.user=user;
                res.status(200).send({token:user.getToken(), error:null});

            }else{
                res.status(401).send({error:"Invalid name and/or password!"});
            }
        }
    });
    */
};
module.exports.register = function(req, res) {

    if(!req.body.regname || !req.body.regpassword){
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();
    user.username = req.body.regname;
    user.password = user.createHash(req.body.regpassword);
    user.email = req.body.email;
    user.save(function (err, user) {
        if (err) {
            throw new Error('Database error!');
            res.status(500).send({error: "Something bad happened!Try again!"});
        }
        console.log("User: " + user.username + " added!");
        res.status(200).send({status: "User saved!"});
    });
};
