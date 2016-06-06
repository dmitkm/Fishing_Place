var mongoose =require("mongoose"),
    Report = require('../model/fish-report'),
    async = require('async'),
    nconf = require('nconf'),
    cloudinary = require('cloudinary');
/*
nconf.argv()
    .env()
    .file({file: '../config/config.json'});

cloudinary.config({
    cloud_name: nconf.get('cloudinary:name'),
    api_key: nconf.get('cloudinary:key'),
    api_secret: nconf.get('cloudinary:secret')
});

*/
module.exports.getReports =function(req,res) {
    Report.find({},function (err,posts) {
        if(err){
            throw err;
            res.status(500).send({error:"Something bad happened!Try again!"});
        }
        if(posts){
            res.status(200).send(posts);
        }
    });
};
module.exports.getReport = function(req,res) {
    Report.findOne({_id:req.params.report_id},function (err,post) {
        if(err){
            throw err;
            res.status(500).send({error:"Something bad happened!Try again!"});
        }

        console.log("id:"+req.params.report_i+":"+post);
        if(post){
            res.status(200).send(post);
        }
    });
};
module.exports.upload = function(req, res){


    async.waterfall([
        function(cb){

            var url_data=[],
                files=req.files,
                count=files.length,
                i=0;

            async.whilst(
                function () { return i < count; },
                function (callback) {

                    cloudinary.uploader.upload(files[i].path, function(image) {
                        url_data.push(image.url);
                        callback(null,url_data);
                    });
                    i++;
                },
                function (err,array) {
                    if( err ) {
                        console.log('A files failed to process');
                        cb(err, null);
                    }else{
                        cb(null,array)
                    }
                }
            );

        },
        function(url_data,cb){

            console.log(url_data);

            var fr = new Report({
                user        :req.user.username,
                title       :req.body.title,
                description :req.body.description,
                fishing_type:req.body.type,
                weight      :req.body.weight,
                lat         :req.body.lat,
                lng         :req.body.lng,
                date        :req.body.date,
                pictures    :url_data
            });

            fr.save(function(err,report) {
                if(err) {
                    cb(err,null);
                    console.log("something happend: "+err.message);
                }

                cb(null,report);
            });

        }
    ],function(err,result){
        if (err) throw err;
        //if all ok will be done
        console.log(result);
    });

    res.status(200).json({ 'status':'success'});
};