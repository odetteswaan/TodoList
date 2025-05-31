const Task=require('./TaskSchema')

const Router=require('express').Router()
Router.post('/task',async(req,res)=>{
try{
const task=new Task(req.body)
const saved=await task.save()
res.status(201).json(saved)
}
catch(err){
res.status(400).json({ error: err.message });
}
})
Router.get('/task',async(req,res)=>{
const tasks=await Task.find()
res.json(tasks)
})

Router.delete('/task/:id',async(req,res)=>{
await Task.findByIdAndDelete(req.params.id);
  res.send('task deleted');
})
Router.put('/task/:id',async(req,res)=>{
const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
})

module.exports=Router