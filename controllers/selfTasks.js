const SelfTasks = require("../models/selfTasks").selfTasksSchema;

exports.getSelfTasks = (req, res, next) => {
  SelfTasks.find().then((result) => res.json(result));
};

exports.getonlyheaderandstatus = (req, res, next) => {
  SelfTasks.find({}, { header: 1, status: 1 }).then((result) =>
    res.json(result)
  );
};

exports.getSelfTasksByGmail = (req, res, next) => {
  SelfTasks.find({
    $and: [{ selfgmail: req.body.gmail }, { category: req.body.category}],
  })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.postSelfTask = (req, res, next) => {
  const selfTasks = new SelfTasks({
    selfgmail: req.body.selfgmail,
    category: req.body.category,
    header: req.body.header,
    taskcontent: req.body.taskcontent,
    priority: req.body.priority,
    deadline: req.body.deadline,
    status: req.body.status,
  });
  selfTasks
    .save()
    .then((result) =>
      res.json({
        msg: "success",
        result: result,
      })
    )
    .catch((err) => console.log(err));
};

exports.editSelfTask = (req, res, next) => {
  SelfTasks.updateOne(
    { _id: req.body._id },
    {
      $set: {
        category: req.body.category,
        header: req.body.header,
        taskcontent: req.body.taskcontent,
        priority: req.body.priority,
        deadline: req.body.deadline,
        status: req.body.status,
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
};

exports.deleteSelfTask = (req, res, next) => {
  SelfTasks.deleteOne({ _id: req.body._id })
    .then((result) =>
      res.json({
        msg: "deleted",
        result: result,
      })
    )
    .catch((err) => console.log(err));
};

exports.updateProgressOfSelfTask = (req, res, next) => {
  SelfTasks.updateOne(
    { _id: req.body._id },
    { $set: { status: req.body.status } }
  )
    .then((result) =>
      res.json({
        msg: "updated progress",
        result: result,
      })
    )
    .catch((err) => console.log(err));
};
