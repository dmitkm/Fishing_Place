
var mongoose= require('mongoose'),
    bCrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    nconf = require('nconf');

    mongoose.connect('mongodb://localhost:27017/fp2');

var User = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required: true
    },
    password:String,
    email:{
        type:String,
        unique:true,
        required: true
    }

});
User.methods.createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
User.methods.isValidPassword = function(password){
    return bCrypt.compareSync(password, this.password);
};
User.methods.getToken = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate()+7);

    return jwt.sign({
        _id:this._id,
        name:this.username,
        email:this.email,
        exp:parseInt(expiry.getTime()/1000)
    }, nconf.get('jwt_secret'));
};

module.exports = mongoose.model("User", User);