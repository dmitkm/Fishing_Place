var express = require('express'),
    app = express(),
    /*app.disable('x-powered-by');*/
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    //cookieSession= require('cookie-session'),
    nconf = require('nconf'),
    handlebars = require('express-handlebars').create({defaultLayout:'main'}),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bCrypt = require('bcrypt-nodejs'),
    session=require('cookie-session'),
    /*multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();*/
    multer  = require('multer'),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/img/uploads');
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        }
      }),
    uploading = multer({ dest: path.join(__dirname,'uploads'),
                      limits:{fileSize:50000000},
                      storage: storage
                    });
    var util = require('util');

    nconf.argv()
     .env()
     .file({file: path.join(__dirname,'config','config.json')});

var User = require('./model/models');
var Report = require('./model/fish-report');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use( express.static(path.join(__dirname, 'public')));
app.use( '/home', express.static(path.join(__dirname,'public/img/uploads')));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    name: 'session_id1',
    secret: nconf.get('cookie-secret'),
    cookieOptions:{maxAge:30*60*1000}
}));


app.use(function(req,res,next){
  console.log("session:"+req.session);
  //console.log(req.user);
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
        }
        next();
      });
    }else{
      next();
    }
});

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
};

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

app.get('/', function(req, res){
  res.render('main');
});
app.get('/login', function(req, res){
    res.send("Please enter you data!");
});

app.post('/login', function(req, res){
      User.findOne({username:req.body.username},function(err,user){
        if(err) throw new Error('Database error!');

        if(!user){
           res.status(401).send({error:"User Not Found!Try again!"});
        }else{

           if(isValidPassword(user, req.body.password)){
             req.session.user=user;
             res.status(200).send({user:user, error:null});

           }else{
             res.status(401).send({error:"Invalid name and/or password!"});
           }
        }
      });

});


/*app.get('/registration', function(req, res){
    res.render('main');
});*/
app.post('/registration', function(req, res){
    var newUser = new User();
    newUser.username=req.body.regname;
    newUser.password=createHash(req.body.regpassword);
    newUser.email=req.body.email;
    newUser.save(function(err,newUser){
        if(err){
            throw err;
            res.status(500).send({error:"Something bad happened!Try again!"});
        }
        console.log("User: "+newUser.username+" added!");
        res.status(200).send({status:"User saved!"});
    });

});



function isAuth(req,res,next){
  console.log(req);
   if(!req.user){
     return res.redirect('/#login');
   }else{
     next();
   }
}
app.get('/fppost',function(req,res) {
  Report.find({},function (err,posts) {
    if(err){
            throw err;
            res.status(500).send({error:"Something bad happened!Try again!"});
    }
    if(posts){
      res.status(200).send(posts);
    }
  });
});

app.post('/upload', /*multipartMiddleware,*/uploading.array('pictures', 10),function(req, res){
    console.log(req.files);
    console.log(typeof req.body.lat);

    var fr = new Report({
      user        :req.user.username,
      title       :req.body.title,
      description :req.body.description,
      fishing_type:req.body.type,
      weight      :req.body.weight,
      coords      :req.body.coord,
      lat         :req.body.lat,
      lng         :req.body.lng,
      date        :req.body.date
    });
    for(var i=0;i<req.files.length;i=i+1){
      fr.pictures.push(req.files[i].originalname);
    }

    fr.save(function(err,report) {
      if(err) return console.log(err);

      console.log("report save: "+report);
    });
    res.status(200).json({ 'status':'success'});
});


app.get('/home', isAuth, function(req,res){

  res.send(req.user);
    //res.render('main');
});

app.get('/logout',function(req,res){
    req.session=null;
    res.status(200).send({status:"logout successfully"});

});

app.listen(nconf.get('port'),function(){
    console.log("server started on port "+nconf.get('port'));
});
