
var mongoose= require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/fp2');

/*var User=*/
    module.exports=mongoose.model("User",new Schema({
    username:{type:String,unique:true},
    password:String,
    email   :{type:String,unique:true}
}));

