var mongoose= require('mongoose'),
    Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/fp2');

var FishReport=new mongoose.Schema({
    user:{
        type:String,
        unique: true,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    fishing_type:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required: true
    },
    pictures:[String],
    lat:{
        type:Number,
        required: true
    },
    lng:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        required: true
    }
});
module.exports=mongoose.model("FishReport",FishReport);
