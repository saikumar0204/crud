const mongoose= require('mongoose')

const TaskSchema= new mongoose.Schema({
  Description:String,
  Completed:Boolean
})

const Task= mongoose.model('task',TaskSchema)

module.exports=Task