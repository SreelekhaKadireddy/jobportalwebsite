const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:[true,'first name is required'],
        maxlength: 32,
    },
    lastName:{
        type:String,
        trim:true,
        required:[true,'last name is required'],
        maxlength: 32,
    },
    email:{
        type:String,
        trim:true,
        required:[true,'email is required'],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    password:{
        type:String,
        trim:true,
        required:[true,'password is required'],
        minlength: [6,'password must have atleast(6) chars'],
    },
    role:{
        type:Number,
        default:0,
    }
},{timestamps:true})

//encrypting password before saving
userSchema.pre('save',async function(next){
    if (!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})
//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
//return a JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:3600})
}
module.exports = mongoose.model("User",userSchema);