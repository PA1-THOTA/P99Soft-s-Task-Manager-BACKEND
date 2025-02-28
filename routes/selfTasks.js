const express=require('express')

const selfTasksController=require('../controllers/selfTasks')

const router=express.Router()

router.get('/getselftasks', selfTasksController.getSelfTasks)

router.post("/getselftasksbygmail", selfTasksController.getSelfTasksByGmail);

router.get('/getonlyheaderandstatus',selfTasksController.getonlyheaderandstatus)

router.post('/postselftask',selfTasksController.postSelfTask)

router.post('/editselftask',selfTasksController.editSelfTask)
  
router.post('/deleteselftask',selfTasksController.deleteSelfTask)

router.post(
  "/updateprogressofselftask",
  selfTasksController.updateProgressOfSelfTask
);

exports.router=router