var express = require('express');
var app = express();
var port = 3333;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MemoryStore = session.MemoryStore;
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('./models/user');
var fileUpload = require('express-fileupload');
var loginerror = undefined
app.use(passport.initialize());
app.use(passport.session());

var fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());

// Conenct to DB
mongoose.connect('mongodb://localhost/resume');
var db = mongoose.connection;

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// console.log(Date.now() + (0.5 * 1 * 1))
// (30 * 86400 * 1000)

app.use(require('express-session')({ secret: 'Use-Secret-Key-Here', store: new MemoryStore(), maxAge: Date.now() + (30 * 20 * 10), resave: false, saveUninitialized: false }));

app.use(cookieParser());
app.set('view-engine', 'ejs');
app.use(express.static('static'));
app.set('views', './views');



app.get('/', function(req, res){
    res.render('index.ejs')
})

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
      /* see done being invoked with different paramters
         according to different situations */
      User.getUserByUsername(username , function (err, user) {
        if (err) { return done(err); }
        if (!user) { loginerror = "badUserInput"; return done(null, false); }
        User.comparePassword(password, user.password, function(err, isMatch){
          if(err) throw err;
          if (!user) { loginerror = "badUserInput"; return done(null, false); }
          if (isMatch) {return done(null, user);} else {
            loginerror = "badUserInput";
            return done(null, false, null, 'badUserInput');
          }
        });
      });
    }
));

passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(function(id, done) {
User.getUserById(id, function(err, user) {
    done(err, user);
});
});


function makecode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
// creating default admin account if there is none
async function makenewuser() {
    console.log( await User.count().exec())
    if ( await User.count().exec() <= 0) {
        passwordrandom = makecode(8)
        var newUser = new User({
            email: 'example@example.com',
            username: 'Admin',
            password: passwordrandom
        })
        console.log("No Admin users found creating default one with credentials (username: Admin Password: " + passwordrandom + ")");
        console.log("please change the credentials despite the password being randomly generated for you")
        await User.createUser(newUser, function(err, user){
            if(err) throw err;
        })
    }
}
makenewuser()
// Endpoint to login

app.get('/admin', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        // if (loginerror == undefined){
        //     loginerror = null;
        //   }
        if(info) {console.log('info:',info);}
        if(err) {console.log('this is an error:',err);}
        if (loginerror != null){
        if(loginerror == 'badUserInput') {
            loginerror = null;
            return res.render('login.ejs', {error: 'Username or Password is incorrect'});
        } else {
            loginerror = null;
            return res.render('login.ejs', {error: null});
        }
        } else {
        return res.render('login.ejs', {error: null});
        }
        req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
        });
    })(req, res, next);
});


app.post("/admin", passport.authenticate("local", 
{ successRedirect: "/", 
    failureRedirect: "/admin", 
    failureMessage: "Invalid username or password" }));


app.listen(port)
