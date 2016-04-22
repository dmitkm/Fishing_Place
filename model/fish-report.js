var mongoose= require('mongoose'),
    Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost:27017/fp2');

module.exports=mongoose.model("FishReport", new Schema({
    user        :String,
    title       :String,
    description :String,
    fishing_type:String,
    weight      :Number,
    pictures    :[String],
    lat         :Number,
    lng         :Number,
    date        :Date
}));