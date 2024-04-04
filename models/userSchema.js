const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(" Not Valid Email");
            }
        }
    },
    phoneNo:{
        type:Number,
        required:true,
        minLength:10
    
    }
});

const users = new mongoose.model("users",userSchema)

module.exports = users;