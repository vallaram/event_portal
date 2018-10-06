require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
require("morgan")("dev");
const bp = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

app.engine('hbs',hbs({defaultLayout:'main'}));
app.set("view engine",'hbs');
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));
app.use(express.static("static"));

mongoose.connect(process.env.DBURL,{useNewUrlParser:true});
mongoose.connection.once("open",()=>console.log("Connected to database"))
.on("error",()=>console.log("Error connecting to DB"));


app.get("/docs",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"static/index.html"));
});
app.use((err,req,res,next)=>{
    res.status(500).json({err});
});
app.use("/teams",require("./routes/teams"));
app.use("/admin",require("./routes/admin"));

app.listen(process.env.PORT || 3000,()=>console.log("Listening..."));
