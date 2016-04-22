app.use(session({
    secret: nconf.get('cookie-secret'),
    resave:true,
    saveUninitialized:true
}));



passport.use(new LocalStrategy(
    /*{passReqToCallback: true},*/
    function(username, password, done){
        User.findOne({ 'username': username }, function (err, user) {
            if (err) {
                return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!isValidPassword(user,password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });

    }));

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
};

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};


app.use(passport.initialize());
app.use(passport.session());




passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


app.post('/login', passport.authenticate('local',
    { successRedirect: '/success', failureRedirect: '/failure'}));

app.get('/success',function(req,res){
    res.send({status:'success',user:req.user});

});
app.get('/failure',function(req,res){
    res.send({status:'failure',user:null,err_mess:"invalid user name or password"});
});
