const express=require('express')

const bodyParser=require('body-parser')

const mongoose=require('mongoose')

const selfTasksRouter=require('./routes/selfTasks')

const TasksRouter=require('./routes/tasks')

const UsersRouter=require('./routes/users')

const app=express()

//variables
const port=process.env.PORT || 8080
const database = 'P99soft'

app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,PATCH")
    res.setHeader("Access-Control-Allow-Headers","Content-Type","application/json")
    next()
})

app.use(selfTasksRouter.router)

app.use(TasksRouter.router) 

app.use(UsersRouter.router)

mongoose.connect(`mongodb+srv://pavan:pavan@cluster0.8ixmj.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`)
.then(result=>{app.listen(port)})
.catch(err=>console.log(err)) 