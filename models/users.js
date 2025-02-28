const mongoose=require('mongoose')

const Schema=mongoose.Schema

const usersSchema=new Schema({
    username:{
        type:"String",
        required:true
    },
    gmail:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    },
    designation:{
        type:"String",
        required:true
    },
    
},
{timestamps:true}) 

exports.usersSchema=mongoose.model('User',usersSchema)
