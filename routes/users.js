const express = require('express')

const {body}=require("express-validator")

const UsersController=require('../controllers/users')

const router=express.Router()

router.get('/getusers',UsersController.getusers)

router.post(
  "/postuser",
  [
    body("username").trim().isLength({ min: 3 }),
    body("gmail").isEmail(),
    body("password").isLength({ min: 8 }).trim(),
  ],
  UsersController.postuser
);

router.post('/finduser',UsersController.finduser)

router.post('/edituser',UsersController.edituser)

router.post('/deleteuser',UsersController.deleteuser)

exports.router=router