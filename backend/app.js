const express=require("express");
const mongoose=require("mongoose");
const app=express();
const morgan=require("morgan");
const bodyparser=require("body-parser")
require("dotenv").config();
var cors=require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error")
//import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

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

//routes middleware
//app.get('/',(req,res)=>{
//    res.send("Hello from node js");
//})
app.use('/api',authRoutes);
app.use('/api',userRoutes);
//error middleware
app.use(errorHandler);

//port
const port=process.env.PORT || 9000;

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})