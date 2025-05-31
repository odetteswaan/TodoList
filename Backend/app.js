const bodyParser = require('body-parser')
const express=require('express')
const Router=require('./Routes')
const { default: mongoose } = require('mongoose')

const app=express()
app.use(bodyParser.json())
app.use('/api',Router)

mongoose.connect('mongodb+srv://akash:17082001@cluster0.fo2hosk.mongodb.net/Task?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    app.listen(3000,()=>console.log('Ypur Port is running at 3000'))
}).catch(err=>console.log('some error occured'))
