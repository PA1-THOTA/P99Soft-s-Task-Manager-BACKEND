const Tasks=require('../models/tasks').tasksSchema

exports.gettasks=(req,res,next)=>{
    Tasks.find().then(result=>res.json(result))
    
}

exports.getassignedtotasks=(req,res,next)=>{
    Tasks.find({ assignedtogmail: req.body.assignedtogmail }).then((result) =>
      res.json(result)
    );
    
}

exports.getassignedtasks=(req,res,next)=>{
    Tasks.find({ assignergmail: req.body.assignergmail }).then((result) =>
      res.json(result)
    );
    
}

exports.posttask=(req,res,next)=>{
    const task=new Tasks({
        assignergmail:req.body.assignergmail,
        assignername:req.body.assignername,
        assignedtogmail:req.body.assignedtogmail,
        assignedtoname:req.body.assignedtoname,
        header:req.body.header,
        taskcontent:req.body.taskcontent,
        priority:req.body.priority,
        deadline:req.body.deadline,
        status:req.body.status,
        msgfromdoer:req.body.msgfromdoer,
        msgstatusforassigner:req.body.msgstatusforassigner,
        seen:req.body.seen,
    })
    task.save()
    .then(result=>res.json({
        msg:"success",
        result:result
    }))
    .catch(err=>console.log(err))
}

exports.edittask=(req,res,next)=>{
    Tasks.updateOne(
      { _id: req.body._id },
      {
        $set: {
          assignergmail: req.body.assignergmail,
          assignername: req.body.assignername,
          assignedtogmail: req.body.assignedtogmail,
          assignedtoname: req.body.assignedtoname,
          header: req.body.header,
          taskcontent: req.body.taskcontent,
          priority: req.body.priority,
          deadline: req.body.deadline,
          status: req.body.status,
          msgfromdoer: req.body.msgfromdoer,
          msgstatusforassigner: req.body.msgstatusforassigner,
          seen: req.body.seen,
        },
      }
    )
      .then((result) =>
        res.json({
          msg: "success",
          result: result,
        })
      )
      .catch((err) => console.log(err));
}

exports.deletetask=(req,res,next)=>{
    Tasks.deleteOne({_id:req.body._id
    })
    .then(result=>res.json({
        msg:"success",
        result:result
    }))
    .catch(err=>console.log(err))
}


exports.updateProgressOfTask = (req, res, next) => {
  Tasks.updateOne({ _id: req.body._id }, { $set: { status: req.body.status } })
    .then((result) =>
      res.json({
        msg: "updated progress succesfully",
        result: result,
      })
    )
    .catch((err) => console.log(err));
};

exports.updateMsgOfTask = (req, res, next) => {
  Tasks.updateOne(
    { _id: req.body._id },
    { $set: { msgfromdoer: req.body.msgfromdoer,msgstatusforassigner: req.body.msgstatusforassigner} }
  )
    .then((result) =>
      res.json({
        msg: "updated Message succesfully",
        result: result,
      })
    )
    .catch((err) => console.log(err));
};

exports.setmsgstatusforassignertoempty = (req, res, next) => {
  Tasks.updateMany(
    {
      $and: [
        { assignergmail: req.body.assignergmail },
        { msgstatusforassigner: "false" },
      ],
    },
    {
      $set: {
        msgstatusforassigner: "",
      },
    }
  )
    .then((result) =>
      res.json({
        msg: "updated msgstatusforassignertoempty succesfully",
        result: result,
      })
    )
    .catch((err) => console.log(err));
};

exports.setnotificationstatusforassignedtotoempty = (req, res, next) => {
  Tasks.updateMany(
    {
      $and: [
        { assignedtogmail: req.body.assignedtogmail },
        { seen: "Not Seen" },
      ],
    },
    {
      $set: {
        seen: "",
      },
    }
  )
    .then((result) =>
      res.json({
        msg: "updated notificationstatusforassignedtotoempty succesfully",
        result: result,
      })
    )
    .catch((err) => console.log(err));
};

