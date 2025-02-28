const mongoose=require('mongoose')

const Schema=mongoose.Schema

const tasksSchema = new Schema(
  {
    assignergmail: {
      type: "String",
      required: true,
    },
    assignername: {
      type: "String",
      required: true,
    },
    assignedtogmail: {
      type: "String",
      required: true,
    },
    assignedtoname: {
      type: "String",
      required: true,
    },
    header: {
      type: "String",
      required: true,
    },
    taskcontent: {
      type: "String",
      required: true,
    },
    priority: {
      type: "String",
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      // notseen/inprogress/completed
      type: "String",
      required: true,
    },
    msgfromdoer: {
      type: "String",
    },
    msgstatusforassigner: {
      //for notification purpose for asisgner
      type: "String",
    },
    seen: {
      // for notification purpose of employee
      type: "String",
    },
  },
  { timestamps: true }
); 

exports.tasksSchema=mongoose.model('task',tasksSchema)
