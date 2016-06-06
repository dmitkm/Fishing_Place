var express = require('express'),
    app = express(),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    //cookieSession= require('cookie-session'),
    nconf = require('nconf'),
    handlebars = require('express-handlebars').create({defaultLayout:'main'}),
    passport = require('passport'),
    session=require('cookie-session'),
    multer  = require('multer'),
    cloudinary = require('cloudinary'),
    exp_jwt = require('express-jwt');

    uploading = multer({ dest: path.join(__dirname,'uploads'),
                      limits:{fileSize:50000000},
                      /*storage: storage*/
                    });

    nconf.argv()
     .env()
    .file({file: path.join(__dirname,'config','config.json')});

    cloudinary.config({
        cloud_name: nconf.get('cloudinary:name'),
        api_key: nconf.get('cloudinary:key'),
        api_secret: nconf.get('cloudinary:secret')
    });
    require('./config/passport_init');

    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, 'views'));
    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        name: 'session_id1',
        secret: nconf.get('cookie-secret'),
        cookieOptions:{maxAge:30*60*1000}
    }));

    app.use(passport.initialize());
    app.use(passport.session());


var auth = exp_jwt({secret: nconf.get('jwt_secret')});

//var mdw = require("./controller/api.controller.js");

var AuthCtrl = require("./controller/auth.controller.js");
var ReportCtrl = require('./controller/fish-report.controller');

//
app.get('/', function(req, res){
  res.render('main');
});

app.post('/login', AuthCtrl.login);
app.post('/registration', AuthCtrl.register);


//app.use(mdw.session_middleware);

app.get('/home', auth, function(req,res){
  res.send(req.user);
});



app.get('/reports', ReportCtrl.getReports);
app.get('/reports/:report_id', auth, ReportCtrl.getReport);
app.post('/upload', uploading.array('pictures', 10),ReportCtrl.upload);


app.get('/logout',function(req,res){
    req.session=null;
    res.status(200).send({status:"logout successfully"});
});

app.listen(nconf.get('port'),function(){
    console.log("server started on port "+nconf.get('port'));
});
