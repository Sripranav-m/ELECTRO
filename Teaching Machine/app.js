const express = require("express");
const app = express()

app.get("/",function (req,res) {
  res.sendFile(__dirname+ "/teachingmachine.html");
});

app.listen(3000,function(){
  console.log("Started at 3000");
});
