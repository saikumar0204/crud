const mongoose= require('mongoose')


mongoose.connect('mongodb://localhost/test',{
  useUnifiedTopology:true,
  useNewUrlParser:true,
  useFindAndModify:false
})

mongoose.connection.on('open',()=>{
  console.log('connnected to mongoose fireworks...');
}).on('error',(err)=>{
  console.log(err)
})

const Task= require('./models/task')
//Dropping collections to empty previous data
mongoose.connection.collections.tasks.drop().then(()=>{})


//Create
//Task1
var newTask= new Task({
  Description:"NOde",
  Completed:true
})
newTask.save()


//Task2
newTask= new Task({
  Description:"Mongo",
  Completed:false
})
newTask.save()

//Task3
 newTask= new Task({
  Description:"Js",
  Completed:true
})
newTask.save()

//Task4
newTask= new Task({
  Description:"Express",
  Completed:false
})
newTask.save()

//Read
Task.find({Completed:false}).then(res=>{
  res.forEach(record => {
    console.log(record)
  });
  console.log('Read Successfully')
})


//Update
Task.updateMany({Completed:false},{Completed:true}).then((res)=>{
  console.log(res,'Updated Succesfuly')
})


var id;
//Delete
Task.findOneAndDelete({_id:id}).then(res=>{
  console.log('Record deleted Successfully')
})
