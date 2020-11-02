const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const { callbackify } = require('util');
var flash = require('req-flash');
const multer = require('multer');

const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const session = require("express-session");
const passport = require("passport");


var JSAlert = require("js-alert");
require("dotenv").config();


const app = express();

const  mongoAtlasUri =
        "mongodb+srv://Electro:seweb123@cluster0.lo18m.mongodb.net/seDB?retryWrites=true&w=majority";
try {
  // Connect to the MongoDB cluster
   mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect");
}
// mongoose.connect("mongodb+srv://Electro:seweb123@cluster0.lo18m.mongodb.net/seDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});


app.use(express.static(__dirname));

app.use(session({
  secret: "MylittleSecretissecret.",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());



app.use(passport.initialize());
app.use(passport.session());


mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


// var Schema = mongoose.Schema;
const projectSchema = {
  title: String,
  descp: String,
  image: String,
  energy: String,
  link: String
};

const postSchema = {
  // _id: String,
  name: String,
  title: String,
  descp: String,
  image: String,
};


app.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'assets/uploads')
  },
  filename: function(req,file,cb){
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
  }
});

var upload = multer({
  storage:storage
}).single('file');


var Card = mongoose.model("card",projectSchema);

var Post = mongoose.model("post",postSchema);

const User = new mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



app.set('view engine', 'ejs');

app.get("/",function(req,res){
  if(req.user){
    res.sendFile(__dirname+"/indexafterlogin.html");
  }
  else{
    res.sendFile(__dirname+'/ind.html' );
  }
});

app.post("/",function(req,res){
  res.send("<h4>Your message has been sent. Thank you!</h4>");
});

app.get("/logout",function (req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/login",function(req, res) {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if(err){
      JSAlert.alert("Login Failed");
      console.log(err);
    }
    else {
      passport.authenticate("local")(req, res, function(){
        JSAlert.alert("Succesfully logged in");
        res.redirect("/");
      });
    }
  })

});

app.post("/register",function(req, res) {

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if(err){
        JSAlert.alert("Registration failed");
        res.sendFile(__dirname+"/signupfailure.html");
    }
    else {
      passport.authenticate("local")(req, res, function(){
        JSAlert.alert("Succesfully registered");
        res.redirect("/");
      });
    }
  });
});

app.get("/addpost",function(req,res){
  if(req.user){
    res.redirect('addposts.html');
  }
  else{
    res.sendFile(__dirname+"/addpostfailure.html");
  }
});

app.post("/addpost", upload, function(req,res){
  if(req.user){
    var postdetails = new Post({
      name: req.user.username,
      title: req.body.title,
      descp: req.body.descp,
      image: req.file.filename
    });

    postdetails.save();
    res.redirect('posts');

  }
  else{
    res.redirect('/');
  }

});



app.get('/solar', function(req, res){
  Card.find({energy: 'solar'},function (err, cardItems) {
    if(!err){
      if(cardItems.length === 0){
        res.render("energy",{energy: "SOLAR", energylist: []});
      }
      else {
        res.render("energy",{energy: "SOLAR", energylist: cardItems});
      }
    }
  });
});

app.get('/hydro', function(req, res){
  Card.find({energy: 'hydro'},function (err, cardItems) {
    if(!err){
      if(cardItems.length === 0){
        res.render("energy",{energy: "HYDRO", energylist: []});
      }
      else {
        res.render("energy",{energy: "HYDRO", energylist: cardItems});
      }
    }
  });
});

app.get('/wind', function(req, res){
  Card.find({energy: 'wind'},function (err, cardItems) {
    if(!err){
      if(cardItems.length === 0){
        res.render("energy",{energy: "WIND", energylist: []});
      }
      else {
        res.render("energy",{energy: "WIND", energylist: cardItems});
      }
    }
  });
});

app.get('/geothermal', function(req, res){
  Card.find({energy: 'geothermal'},function (err, cardItems) {
    if(!err){
      if(cardItems.length === 0){
        res.render("energy",{energy: "GEOTHERMAL", energylist: []});
      }
      else {
        res.render("energy",{energy: "GEOTHERMAL", energylist: cardItems});
      }
    }
  });
});

app.get('/biomass', function(req, res){
  Card.find({energy: 'biomass'},function (err, cardItems) {
    if(!err){
      if(cardItems.length === 0){
        res.render("energy",{energy: "BIOMASS", energylist: []});
      }
      else {
        res.render("energy",{energy: "BIOMASS", energylist: cardItems});
      }
    }
  });
});

app.get('/tidal', function(req, res){
  Card.find({energy: 'tidal'},function (err, cardItems) {
    if(!err){
      if(cardItems.length === 0){
        res.render("energy",{energy: "TIDAL", energylist: []});
      }
      else {
        res.render("energy",{energy: "TIDAL", energylist: cardItems});
      }
    }
  });
});

app.get('/posts',function(req,res){
  Post.find({},function(err, posts){
    if(!err){
      if(posts.length === 0){
        res.render("posts",{posts: []});
      }
      else{
        res.render("posts",{posts: posts});
      }
    }
  });
});

app.get("/startgame",function(req,res){
  res.sendFile(__dirname+"/startgame.html");
});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
  console.log(__dirname);
});
