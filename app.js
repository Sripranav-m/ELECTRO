const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost:27017/sewebDB", {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();

app.use(express.static(__dirname));

const projectSchema = {
  title: String,
  descp: String,
  image: String
};

var Card = mongoose.model("card",projectSchema);

app.set('view engine', 'ejs');

app.get("/",function(req,res){
  res.sendFile(__dirname+'/index.html' );
});

app.get('/solar', function(req, res){
  Card.find({},function (err, cardItems) {
    if(!err){
      if(cardItems.length === 0){
        res.render("solar",{energy: "SOLAR", solar: []});
      }
      else {
        // console.log(cardItems);
        res.render("solar",{energy: "SOLAR", solar: cardItems});
      }
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
  console.log(__dirname);
});
