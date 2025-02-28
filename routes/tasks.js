const express=require('express')

const TasksController=require('../controllers/tasks')

const router=express.Router()

router.get('/getTasks',TasksController.gettasks)

router.post('/postTask',TasksController.posttask)

router.post('/editTask',TasksController.edittask)

router.post('/deleteTask', TasksController.deletetask)

router.post("/getassignedtotasks", TasksController.getassignedtotasks);

router.post('/getassignedtasks', TasksController.getassignedtasks)

router.post(
  "/updateprogressoftask",
  TasksController.updateProgressOfTask
);

router.post("/updatemsgoftask", TasksController.updateMsgOfTask);

router.post("/setmsgstatusforassignertoempty", TasksController.setmsgstatusforassignertoempty);

router.post("/setnotificationstatusforassignedtotoempty", TasksController.setnotificationstatusforassignedtotoempty);

exports.router=router