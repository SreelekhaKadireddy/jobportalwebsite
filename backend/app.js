const express=require("express");
const mongoose=require("mongoose");
const app=express();
const morgan=require("morgan");
const bodyparser=require("body-parser")
require("dotenv").config();
var cors=require("cors");

//database connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("DB connected"))
.catch((err)=>console.log(err))
//port
const port=process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})