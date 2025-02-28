const mongoose=require('mongoose')

const Schema=mongoose.Schema

const selfTasksSchema=new Schema({
    selfgmail:{
        type:String,
        required:true
    },
    category:{ //personal or professional
        type:String,
        required:true
    },
    header:{
        type:"String",
        required:true
    },
    taskcontent:{
        type:"String",
        required:true
    },
    priority:{
        type:"String",
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    status:{    // inprogress/completed
        type:"String",
        required:true
    }
},
{timestamps:true}) 

exports.selfTasksSchema=mongoose.model('Selftask',selfTasksSchema)
