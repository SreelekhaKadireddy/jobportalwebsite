const express=require("express");
const mongoose=require("mongoose");
const app=express();
const morgan=require("morgan");
const bodyparser=require("body-parser")
require("dotenv").config();
var cors=require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error")

//database connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("DB connected"))
.catch((err)=>console.log(err));

//middleware
app.use(morgan("dev"));
app.use(bodyparser.json({limit:"5mb"}));
app.use(bodyparser.urlencoded({
    limit:"5mb",
    extended:true
}));
app.use(cookieParser());
app.use(cors());

//error middleware
app.use(errorHandler);

//port
const port=process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})