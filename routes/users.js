const express=require('express')

const UsersController=require('../controllers/users')

const router=express.Router()

router.get('/getusers',UsersController.getusers)

router.post('/postuser',UsersController.postuser)

router.post('/finduser',UsersController.finduser)

router.post('/edituser',UsersController.edituser)

router.post('/deleteuser',UsersController.deleteuser)

exports.router=router