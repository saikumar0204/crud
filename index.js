const mongoose= require('mongoose')


//1.
mongoose.connect('mongodb://localhost/test',{
  useUnifiedTopology:true,
  useNewUrlParser:true,
  useFindAndModify:false
})

mongoose.connection.on('open',()=>{
  console.log('connnected to mongodb');
}).on('error',(err)=>{
  console.log(err)
})

//2.
const Task= require('./models/task')
//Dropping collections to empty previous data
mongoose.connection.collections.tasks.drop()

//3.Create
var newTask;
var create=(desc,status)=>{
   newTask= new Task({
    Description:desc,
    Completed:status
  }).save().then(res=>{
    console.log(`${res.Description} added succesfully`)
  })
}

//Adding 4 tasks
create('Node',false)
create('Mongo',false)
create('js',true)
newTask=new Task({
  Description:'Css',
  Completed:true
})
newTask.save().then((res)=>{
  console.log(`${res.Description} added succesfully`)
  //Reading tasks after creating 4documents
  Read()
})

//4.Read
var Read=()=>{
  Task.find({Completed:false}).then(res=>{
    res.forEach(record => {
      console.log(record)
    });
    console.log('Read Successfully')
    //Updating tasks after reading 
    update()
  })
}

//5.Update
var update=()=>{
  Task.updateMany({Completed:false},{Completed:true}).then((res)=>{
    console.log('Updated Succesfuly')
    //deleting a task after updating
    Delete(newTask.id)
  })
}


//6.Delete
var Delete=(id)=>{
  Task.findOneAndDelete({_id:id}).then(res=>{
    console.log(`${res.Description} deleted successfully`)
  })
}
