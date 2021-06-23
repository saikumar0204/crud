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

//Create
const newTask= new Task({
  Description:"NOde",
  Completed:false
})
newTask.save().then(res=>{
  // console.log(res);
  console.log('SAved Successfully')
})

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
Task.findOneAndDelete({_id:newTask.id}).then(res=>{
  console.log('Record deleted Successfully')
})
